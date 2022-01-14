import React from 'react'
import './Stylling.css'
import { Link } from 'react-router-dom'
import profile_pic from '../Images/profile_pic.png'
import Forgot_password from '../Images/Forgot_password.png'
function Forgetpassword() {
    return (
        <>
           <div className='container'>
          <div>
            <img className='avatar' src={Forgot_password}/>
          </div>
          <div className='login-container'>
            <form action='index.html'>
            <img src={profile_pic} className='profilepic'/>
            <h1>Forgot Password</h1>  
            <div className='input-div one focus'>
            <div className='i'>
              <i className='fas fa-user'></i>
            </div>
            <div>
              <h5>Email</h5>
              <input className='input' type="text"></input>
            </div>
            </div>
            <Link to="/">Forgot Password</Link>
            
            <input type="submit" className='btn' value="continue"></input>
            </form>
          </div> 
          </div> 
        </>
    )
}

export default Forgetpassword
