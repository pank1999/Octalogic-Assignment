import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

export default function ({formData,setFormData,error}) {

 

    return (
    <div>
       <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">No of Wheels</FormLabel>
             <RadioGroup
               aria-labelledby="demo-radio-buttons-group-label"
               aria-required
               name="radio-buttons-group"
               onChange={(e)=>setFormData({...formData,NoOfWheels:e.target.value})}
              >
             <FormControlLabel value={2} control={<Radio />} label="Two" />
             <FormControlLabel value={4} control={<Radio />} label="Four" />
            </RadioGroup>
            <span style={{color:"red"}}>{error?"choose any option":" "}</span>
        </FormControl>
       
    </div>
  )
}
