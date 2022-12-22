import React from 'react'
import { useEffect, useState } from 'react';
import Axios from "axios";
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Posts from "./Posts"
import "./styles/Home.css"

function Home() {
    const initialValues = {username: "", dob: "", email: "", mobile: ""}
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValues({...formValues, [name]: value});
    }
  
    // age calculator function
    function calculateAge (birthDate, otherDate) {
      birthDate = new Date(birthDate);
      otherDate = new Date(otherDate);
  
      var years = (otherDate.getFullYear() - birthDate.getFullYear());
  
      if (otherDate.getMonth() < birthDate.getMonth() || 
          otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
          years--;
      }
  
      return years;
    }
  
    const handleSubmit = (e)=> {
      e.preventDefault();
      setFormErrors(validate(formValues));
      if(Object.keys(formErrors).length===0) {
        Axios.post("https://user-info-api.onrender.com/submit", formValues).then((response)=>{

          if(response.data.error) {
            setFormErrors(formErrors=>({
              ...formErrors,
              ["mobile"]: response.data.error
            }))
            console.log(formErrors)
          } else {
            console.log(response.data)
            navigate('/submit')
          }

          // Object.keys(response.data)[0] 
          //setFormErrors({...formErrors, [Object.keys(response.data)[0]]: response.data.mobile})
        })
      }
      setIsSubmit(true);
    }
  
    useEffect(()=> {
      //console.log(formErrors);
    }, []);
  
    // validation function
    const validate = (values)=> {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if(!values.username) {
        errors.username = "Username is required"
      }
  
      if(!values.dob) {
        errors.dob = "Please select your Date of birth"
      } else {
        var currentDate = new Date().toLocaleDateString('en-CA');
        var age = calculateAge(values.dob, currentDate);
        console.log(age);
        if(age<18) {
          errors.dob = "Age should be minimum of 18 years";
        }
      }
  
      if(!values.email) {
        errors.email = "Email is required"
      } else if(!regex.test(values.email)) {
          errors.email = "Please enter a valid email";
      }
  
      if(!values.mobile) {
        errors.mobile = "Mobile number is required";
      }
  
      return errors;
    }
  
    return (
      <div className="container">
        <div className='header'>Employee Forms
        </div>
        <br/>
        <div className='hr'> </div>
        <form onSubmit={handleSubmit}>
          <div className='form-header'><h2>Fill Info</h2></div>
          <div className='form-fields'>
            <div className='field'>
              <label>Username</label><br/>
              <input 
                type="text"
                name='username'
                value = {formValues.username}
                placeholder='Enter name...'
                onChange={handleChange}
              />
              <p>{formErrors.username}</p>
            </div>
            <div className='field'>
              <label>Date of Birth</label><br/>
              <input 
                type="date"
                name='dob'
                value = {formValues.dob}
                onChange={handleChange}
              />
              <p>{formErrors.dob}</p>
            </div>
            
    
            <div className='field'>
              <label>Email</label><br/>
              <input 
                type="text"
                name='email'
                value = {formValues.email}
                placeholder='Enter email...'
                onChange={handleChange}
              />
              <p>{formErrors.email}</p>
            </div>
    
            <div className='field'>
              <label>Mobile</label><br/>
              <input 
                type="text"
                name='mobile'
                value = {formValues.mobile}
                placeholder='Enter phone number...'
                onChange={handleChange}
              />
              <p>{formErrors.mobile}</p>
            </div>
            <button>Submit</button>
          </div>
        </form>
  
      </div>
    );
}

export default Home