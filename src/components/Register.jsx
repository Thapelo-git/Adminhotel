import React,{useRef, useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import './Stylling.css'
import profile_pic from '../Images/profile_pic.png'
import personal_information from '../Images/personal_information.png'
import personal_info from '../Images/personal_info.png'
import {Button,Card, Form,Container,Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'


function Register() {
  const emailRef=useRef()
  const passwordRef=useRef()
  const passwordConfirmRef=useRef()
  const {signup}=useAuth()
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const history = useHistory()

  async function  handleSubmit (e){
    e.preventDefault()
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('password do not match')
    }
    try{
      setError('')
      setLoading(true)
      await signup(emailRef.current.value,passwordRef.current.value)
      history.push('/D')
    } catch{
      setError('failed to create an account')
    }
    setLoading(false)
  }
    return (
        <>
        <Container
    className='d-flex align-items-center justify-content-center'
    style={{minHeight:"100vh"}}>
         <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required/>
              </Form.Group>
              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required/>
              </Form.Group>
              <Form.Group id='password-confirm'>
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required/>
              </Form.Group>
              <Button disabled={loading} className='w-100' type="submit">Sign Up</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Already have an account? <Link to="/">Sign In</Link>
        </div>
        </Container>
            {/* <div className='container'>
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
          
        </div>  */}
        </>
    )
}

export default Register
