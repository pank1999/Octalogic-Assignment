import { useEffect, useState } from "react";
import "./Home.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";

export default function ThirdPage({formData,setFormData,error}) {
   const [vehicalList,setVehicalList]=useState([]);
   useEffect(()=>{
       const  getVehicles= async ()=>{
        if(formData.NoOfWheels==2){
          const res= await axios.get("http://localhost:3002/bikes");
          setVehicalList(res.data);
        }else{
          const res= await axios.get("http://localhost:3002/cars");
          setVehicalList(res.data);
        } 
       }
       getVehicles();
   },[]);
   
  return (
    <div>
      <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Type of Vehical</FormLabel>
             <RadioGroup
               aria-labelledby="demo-radio-buttons-group-label"
               name="radio-buttons-group"
               onChange={(e)=>setFormData({...formData,TypeOfVehical:e.target.value})}
              >
              { 
                vehicalList.map((item)=>(
                 <FormControlLabel value={item} key={item} control={<Radio />}  label={item} />
                ))
              }
            </RadioGroup>
            <span style={{color:"red"}}>{error?"choose any option to procede next":" "}</span>
        </FormControl>
        </div>
  )
}
