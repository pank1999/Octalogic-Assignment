const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");

const app=express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL,(err)=>{
   if(!err){
    console.log("DB connection successful");
   }
   console.log(err);
});

const CarSchema= new mongoose.Schema({
    name:String,
    types:String,
});

const BikeSchema= new mongoose.Schema({
    name:String,
    types:String,
});


const BookingDetailsSchema=new mongoose.Schema({
    FirstName:String,
    LastName:String,
    NoOfWheels:Number,
    TypeOfVehical:String,
    SpecificModel:String,
    DateRange:Array,
    Status:String,
});

const BookingDetails=mongoose.model("BookingDetail",BookingDetailsSchema);
const Car=mongoose.model("car",CarSchema);
const Bike=mongoose.model("bike",BikeSchema);


app.use(cors());
app.use(express.json());

app.get("/bikes",async (req,res)=>{
    const bikes= await Bike.find().select('types').distinct('types');
    console.log(bikes);
    res.status(200).send(bikes);
});
app.get("/cars", async (req,res)=>{
    const cars= await Car.find().select('types').distinct('types');
    console.log(cars);
    res.status(200).send(cars);
});

app.get("/bikes/:type",async (req,res)=>{
     const type=req.params.type;
     const bikesModels=await Bike.find({types:type}).select('name').distinct('name');
     console.log(bikesModels);
     res.status(200).send(bikesModels);
});

app.get("/cars/:type",async (req,res)=>{
     const type=req.params.type;
     const carsModels=await Car.find({types:type}).select('name').distinct('name');
     console.log(carsModels);
     res.status(200).send(carsModels);
});


app.get("/DateRange",async (req,res)=>{
    let q1=req.query.TypeOfVehical;
    let q2=req.query.SpecificModel;
    const DateRangeArray=await BookingDetails.find({TypeOfVehical:q1,SpecificModel:q2}).select('DateRange');
    console.log(DateRangeArray);
    res.send(DateRangeArray);
});

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.post("/BookingDetails",(req,res)=>{
    const BookingData=req.body;
    const Data = new BookingDetails({
        FirstName:BookingData.FirstName,
        LastName:BookingData.LastName,
        NoOfWheels:BookingData.NoOfWheels,
        TypeOfVehical:BookingData.TypeOfVehical,
        SpecificModel:BookingData.SpecificModel,
        DateRange:BookingData.DateRange,
        Status:"confirom",
    });
    

    Data.save();
    res.status(200).send(Data);

});

app.listen(3002,()=>{
    console.log("server is running on port 3002");
});


