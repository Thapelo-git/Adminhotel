import React from 'react'
import { Link } from 'react-router-dom'
import './Stylling.css'
import profile_pic from '../Images/profile_pic.png'
import personal_information from '../Images/personal_information.png'
import personal_info from '../Images/personal_info.png'
function Register() {
    return (
        <>
            <div className='container'>
          <div>
            <img className='avatar' src={personal_info}/>
          </div>
          <div className='login-container'>
            <form action='index.html'>
            <img src={profile_pic} className='profilepic'/>
            <h1>Register</h1>  
            <div className='input-div one focus'>
            <div className='i'>
              <i className='fas fa-user'></i>
            </div>
            <div>
              <h5>Username</h5>
              <input className='input' type="text"></input>
            </div>
            </div>
            <div className='input-div two focus'>
            <div className='i'>
              <i className='fas fa-lock'></i>
            </div>
            <div>
              <h5>Password</h5>
              <input className='input' type="password"></input>
            </div>
            </div>
           
            <input type="submit" className='btn' value="Register"></input>
            </form>
          </div>
          
        </div> 
        </>
    )
}

export default Register
