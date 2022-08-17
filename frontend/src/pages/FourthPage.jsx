import "./Home.css";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from "react";
import axios from "axios";

export default function FourthPage({formData,setFormData,error}) {

  const [ModelList,setModelList]=useState([]);
  useEffect(()=>{
      const  getModels= async ()=>{
       if(formData.NoOfWheels==2){
         const res= await axios.get(`http://localhost:3002/bikes/`+formData.TypeOfVehical);
         setModelList(res.data);
       }else{
         const res= await axios.get(`http://localhost:3002/cars/`+formData.TypeOfVehical);
         setModelList(res.data);
       } 
      }
      getModels();
  },[]);
  
  return (
    <div>
    <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Specific Models</FormLabel>
          
           <RadioGroup
             aria-labelledby="demo-radio-buttons-group-label"
             name="radio-buttons-group"
             onChange={(e)=>setFormData({...formData,SpecificModel:e.target.value})}
            >
            { 
              ModelList.map((item)=>(
               <FormControlLabel value={item} key={item} control={<Radio />}  label={item} />
              ))
            }
          </RadioGroup>
          
          <span style={{color:"red"}}>{error?"choose any option to procede next ":" "}</span>
      </FormControl>
      </div>
  )
}
