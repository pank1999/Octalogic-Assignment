import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function FifthPage({formData,setFormData,error}) {
  const [startValue, setStartValue] =useState(null);
  const [endValue, setEndValue] =useState(null);
 
  useEffect(()=>{
    console.log(startValue);
    console.log(endValue);
     setFormData({...formData,DateRange:[startValue,endValue]});
  },[startValue,endValue]);
  

  return (
    <div>
     <p>Select Booking Date Interval</p>
    <label>Start Date</label> 
    <div style={{marginTop:"20px",marginBottom:"10px"}}>
    <LocalizationProvider  dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={startValue}
        onChange={(newValue) => {
          setStartValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </div>
    <label>End Date</label>
    <div style={{marginTop:"20px"}}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={endValue}
        onChange={(newValue) => {
          setEndValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </div>
    <span style={{color:"red"}}>{error?"select valid date":" "}</span>
    {/* <span style={{color:"red"}} >{ValidDateRange?"":"Please Select another Date"}</span> */}
    </div>
  );
}
