import React from 'react'
import { Link } from 'react-router-dom'
import './Stylling.css'
function SignIn() {
    return (<>
        <div className='container'>
          <div>
            <img className='avatar' src='personal_information.png'/>
          </div>
          <div className='login-container'>
            <form action='index.html'>
            <img src='profile_pic.png'/>
            <h1>SignIn</h1>  
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
            <Link>Forgot Password</Link>
            <input type="submit" className='btn' value="Login"></input>
            </form>
          </div>
          
        </div>
        </>
    )
}

export default SignIn
