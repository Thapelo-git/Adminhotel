import React,{useRef, useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import './Stylling.css'
import profile_pic from '../Images/profile_pic.png'
import personal_information from '../Images/personal_information.png'
import personal_info from '../Images/personal_info.png'
import {Button,Card, Form,Container,Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

function Register() {
  const [Phonenumber, setPhonenumber] = useState("");
    const [Firstname, setFirstname] = useState("");

  const emailRef=useRef()
  const passwordRef=useRef()
  const passwordConfirmRef=useRef()
  const {signup}=useAuth()
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const history = useHistory()

  const handleSubmit= async (e)=>{
    e.preventDefault()
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('password do not match')
    }
    try{
      setError('')
      setLoading(true)
      await signup(emailRef.current.value,passwordRef.current.value)
      .then(res=>{
        const user={
          Firstname: Firstname,
                        
                        emailRef: emailRef.current.value,
                        Phonenumber: Phonenumber,
                        uid: res.user.uid
        }
        db.ref('/admin').child(res.user.uid).set(user)
        
      })
      history.push('/Dashboard')
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
      <div className='w-100' style={{maxWidth:"700px"}}>
         <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
            <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-4 col-form-label">First Name</label>
    <div class="col-sm-8">
      <input type="text" onChange={(e) => setFirstname(e.target.value)} required
        class="form-control" id="staticEmail" placeholder="First Name"/>
    </div>
    </div>
    <div class="mb-3 row">
    <label  class="col-sm-4 col-form-label">Phone Number</label>
    <div class="col-sm-8">
      <input type="text" onChange={(e) => setPhonenumber(e.target.value)} required
        class="form-control" id="staticEmail" placeholder="Phone Number"/>
    </div>
    </div>
            <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-4 col-form-label">Email</label>
    <div class="col-sm-8">
      <input type="email" ref={emailRef} required
        class="form-control" id="staticEmail" placeholder="email@example.com"/>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-4 col-form-label">Password</label>
    <div class="col-sm-8">
      <input type="password" ref={passwordRef} required
        class="form-control"  placeholder="password"/>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-4 col-form-label">Confirm Password</label>
    <div class="col-sm-8">
      <input type="password" ref={passwordConfirmRef} required
        class="form-control" id="staticEmail" placeholder="Confirm Password"/>
    </div>
  </div>
              {/* <Form.Group id='email'>
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
              </Form.Group> */}
              <Button disabled={loading} className='w-100' type="submit">Sign Up</Button>
            </Form>
          </Card.Body>
          <div class="mb-3 row">
          <div className='w-100 text-center mt-2'>
          Already have an account? 
        </div>
    <div class="col-sm-6">
    <Link to="/" >Sign In</Link>
    </div>
    </div>
          
        </Card>
        
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
