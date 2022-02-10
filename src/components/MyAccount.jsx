import React,{useRef, useState} from 'react'
import { Link,useHistory, } from 'react-router-dom'
import './Stylling.css'
import profile_pic from '../Images/profile_pic.png'
import personal_information from '../Images/personal_information.png'
import personal_info from '../Images/personal_info.png'
import {Button,Card, Form,Container,Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'


function MyAccount() {
  const emailRef=useRef()
  const passwordRef=useRef()
  const passwordConfirmRef=useRef()
  const {currentUser,updateEmail,updatePassword}=useAuth()
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const history = useHistory()

   const  handleSubmit= (e)=>{
    e.preventDefault()
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('password do not match')
    }
    const promises=[]
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email){
        promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value !== currentUser.email){
        promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(()=>{
        history.push('/')
    }).catch(()=>{
        setError('failed to update account')
    }).finally(()=>{
        setLoading(false)
    })
    
  }
    return (
        <>
       <Container
    className='d-flex align-items-center justify-content-center'
    style={{minHeight:"100vh"}}>
      <div className='w-100' style={{maxWidth:"400px"}}>
         <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required 
               defaultValue={currentUser?.email} />
              </Form.Group>
              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} 
                placeholder='Leave blank to keep the same'/>
              </Form.Group>
              <Form.Group id='password-confirm'>
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} 
                placeholder='Leave blank to keep the same'/>
              </Form.Group>
              <Button disabled={loading} className='w-100' type="submit">Update</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          <Link to="/Dashboard">cancel</Link>
        </div>
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

export default MyAccount
