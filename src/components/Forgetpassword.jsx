import React,{useRef,useState} from 'react'
import './Stylling.css'
import { Link ,useHistory} from 'react-router-dom'
import profile_pic from '../Images/profile_pic.png'
import Forgot_password from '../Images/Forgot_password.png'
import {Button,Card, Form,Container,Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

function Forgetpassword() {
  const emailRef=useRef()
  const {resetPassword}=useAuth()
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState('')

  async function  handleSubmit (e){
    e.preventDefault()
    
    try{
      setLoading('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
     
    } catch{
      setError('failed to reset Password')
    }
    setLoading(false)
  }
    return (
        <>
         <Container
    className='d-flex align-items-center justify-content-center'
    style={{minHeight:"100vh"}}>
      <div className='w-100' style={{maxWidth:"400px"}}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} requred/>
              </Form.Group>
            
              <Button className='w-100' type="submit">Reset Password</Button>
            </Form>
            
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          <Link to='/'>Login</Link>
        </div>
        </div>
        </Container>
           {/* <div className='container'>
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
            
            
            <input type="submit" className='btn' value="continue"></input>
            </form>
          </div> 
          </div>  */}
        </>
    )
}

export default Forgetpassword
