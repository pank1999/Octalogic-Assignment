import React, { useState } from 'react'
import "./Home.css";

export default function FirstPage({formData,setFormData,errors}) {
    
  return (
    <div>
        <div className='formItem'>
                 <p>First Name</p>
                 <input  type="text" required="true" onChange={(e)=>setFormData({...formData,FirstName:e.target.value})} value={formData.FirstName} placeholder='Your First Name' />
                 <span>{errors[0]}</span>
        </div>
        <div className='formItem'>
                 <p>Last Name</p>
                 <input  type="text" required="true"  onChange={(e)=>setFormData({...formData,LastName:e.target.value})} value={formData.LastName}   placeholder='Your Last Name' />
                 <span>{errors[1]}</span>
        </div>
    </div>
  )
}
