import React, { useEffect, useState } from 'react'
import FifthPage from './FifthPage';
import FirstPage from './FirstPage';
import FourthPage from './FourthPage';
import "./Home.css";
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import axios from "axios";

export default function Home() {
  const [ValidDateRange,setValidDateRange]=useState(true);  
    const [page,setPage]=useState(0);
    const errors=["First Name can not be empty","First Name can not be empty"];
    const [error,setError]=useState(false);
    
    const [formData,setFormData]=useState({
      FirstName:"",
      LastName:"",
      NoOfWheels:0,
      TypeOfVehical:"",
      SpecificModel:"",
      DateRange:[],
      Status:"Pending",
    });
    const handleClick=(e)=>{
            if(formData.NoOfWheels===0 && page ===1){
                 setError(true);
            }
            else if(formData.TypeOfVehical==="" && page===2){
                  setError(true);
            }
            else if(formData.SpecificModel==="" && page===3){
                 setError(true);
            }
            else if(page==4){
                 setError(true);
            }
            else{
              setPage(page+1);
              setError(true);
            }
    }
    
    const CheckDateRangeIsAvailable= async(start,end)=>{
    

      if(formData.NoOfWheels==2){
       const res=await axios.get(`http://localhost:3002/DateRange/?TypeOfVehical=`+formData.TypeOfVehical+"&SpecificModel="+formData.SpecificModel);
       console.log(res.data);
       const DataRangeObject=res.data;
      
      DataRangeObject.forEach(element => {
         let startDateDB=element.DateRange[0].slice(0,10).split("-");
          let endDateDB=element.DateRange[1].slice(0,10).split("-");
          if((parseInt(endDateDB[2])+1)>(parseInt(start[2])+1)){
              setValidDateRange(false);
           }
      });
     } 
      else{
       const res=await axios.get(`http://localhost:3002/DateRange/?TypeOfVehical=`+formData.TypeOfVehical+"&SpecificModel="+formData.SpecificModel);
       const DataRangeObject=res.data;
       DataRangeObject.forEach(element => {
         let startDateDB=element.DateRange[0].slice(0,10).split("-");
          let endDateDB=element.DateRange[1].slice(0,10).split("-");
          if((parseInt(endDateDB[2])+1)>(parseInt(start[2])+1)){
           setValidDateRange(false);
        }
      });
      
      }
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    setValidDateRange(true);
    let today = new Date().toISOString().slice(0, 10).split("-");
    let startdate=formData.DateRange[0].toISOString().slice(0,10).split("-");
    let enddate=formData.DateRange[1].toISOString().slice(0,10).split("-");
      if((formData.DateRange[0]==null || formData.DateRange[1]==null) && page===4){

       setError(true);
      
      }  
      else if((parseInt(startdate[2])+1)< parseInt(today[2]) || (parseInt(enddate[2])+1)<parseInt(today[2]) || (parseInt( startdate[2])+1)== (parseInt(enddate[2])+1) ||(parseInt(enddate[2])+1)< (parseInt(startdate[2])+1))  {
          setError(true);
          alert("please select valid  date");
       }
      else{
        CheckDateRangeIsAvailable(startdate,enddate);
       if(ValidDateRange===true){
         try{
            setError(false);
            const res=axios.post("http://localhost:3002/BookingDetails",formData);
            res && alert("Booking is Successfull");
            setPage(0);
            setFormData({
             FirstName:"",
             LastName:"",
             NoOfWheels:0,
             TypeOfVehical:"",
             SpecificModel:"",
             DateRange:[],
             Status:"Pending",
           });
            
         }catch(err){
           console.log(err);
         }
       }
       
      }
    
  }
  
    const DisplayPage=()=>{
        if(page===0){
           return <FirstPage formData={formData} setFormData={setFormData}  errors={errors}/>
          }else if(page===1){
            return <SecondPage formData={formData} error={error} setFormData={setFormData} />
          }
          else if(page===2){
            return <ThirdPage  formData={formData} error={error} setFormData={setFormData}/>
          }
          else if(page===3){
            return <FourthPage formData={formData} error={error} setFormData={setFormData} />
          }
          else if(page===4){
            return <FifthPage formData={formData} error={error} page={page} setError={setError} setFormData={setFormData} />
          }
          else{
            return(
              <div>
                <p>Thanks for booking </p>
              </div>
            )
          }
    }
  return (
    <div className='container'>
       <div className='formContainer'>
            <h2 className='title'> Vehical Booking Details</h2>
                {DisplayPage()}               

            { page===4
             ?
            <button onClick={handleSubmit} style={{backgroundColor:"teal"}} className='nextButton'>Submit</button>
            :
            <button onClick={handleClick} className='nextButton'>Next</button> 
            }
       </div>
    </div>
  )
}
