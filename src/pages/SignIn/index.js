import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import axios from 'axios'
import toast from 'react-hot-toast'



import "./index.css"

const SignIn = () => {
    const navigate = useNavigate();
    const data = {
        name:"",
        email:"",
        password:""
    }
    const[user, setUser] = useState(data);

    const inputHandler = (e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }

    const submitForm = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3002/api/signup", user);
            console.log(res);
            // Store the token in local storage
            localStorage.setItem('token', res.data.jwt_token);
            toast.success(res.data.message);
            navigate('/');
        } catch (error) {
            //console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/');
        }
    },[navigate]);
  return (
    <div className='addUser'>
      <h3>Create Account</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor='name'>Name</label>
          <input value={user.name} 
            onChange={inputHandler}  
            type='text' 
            name='name' 
            id='name' 
            placeholder='Enter Name' 
            required/>
        </div>
        <div className='inputGroup'>
          <label htmlFor='email'>Email</label>
          <input 
            value={user.email} 
            onChange={inputHandler}  
            type='email' 
            name='email' 
            id='email' 
            placeholder='Enter Email' 
            required/>
        </div>
        <div className='inputGroup'>
          <label htmlFor='password'>Password</label>
          <input 
            value={user.password} 
            onChange={inputHandler}  
            type='password' 
            name='password' 
            id='password' 
            placeholder='Enter Password' 
            required/>
        </div>
        <div className='inputGroup'>
          <button type='submit'>SIGN IN</button>
        </div>
      </form>
      <div className='member'>
            Already have an account? <Link to='/login' className='link'>Login</Link>
        </div>
    </div>
  )
}

export default SignIn