import React,{useRef,useState,useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import './Stylling.css'
import profile_pic from '../Images/profile_pic.png'
import personal_information from '../Images/personal_information.png'
import On_the_office from '../Images/On_the_office.png'
import {Button,Card, Form,Container,Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { auth } from '../firebase'
function SignIn() {
  const emailRef=useRef()
  const passwordRef=useRef()
  const {login}=useAuth()
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const history = useHistory()


  const  handleSubmit = async (e)=>{
    e.preventDefault()
    
    try{
      setError('')
      setLoading(true)
      await login(emailRef.current.value,passwordRef.current.value)
      .then((res)=>{
        try {
              
          localStorage.setItem("user", res.user.uid)
      } catch (e) {
        // saving error
        console.log('no data')
      }
      })
      history.push('/Dashboard')
    } catch{
      setError('failed to sign in check Email/Password')
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
            <h2 className='text-center mb-4'>Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} requred/>
              </Form.Group>
              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} requred/>
              </Form.Group>
              <Button className='w-100' type="submit">Log In</Button>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to="/forgetpassword">forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
         Don't have an account?  <Link to='/Register'>Sign Up</Link>
        </div>
        </div>
        </Container>
        {/* <div className='container'>
          <div>
            <img className='avatar' src={On_the_office}/>
          </div>
          <div className='login-container'>
            <form action='index.html'>
            <img src={profile_pic} className='profilepic'/>
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
            <Link to="/Forgetpassword">Forgot Password</Link>
            <input type="submit" className='btn' value="Login"></input>
            <Link to="/Register">Register</Link>
            </form>
          </div>
          
        </div> */}
        </>
    )
}

export default SignIn
