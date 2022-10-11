import React,{useState,useEffect} from 'react'
import ImageUploading from 'react-images-uploading';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth,db } from '../firebase';
import {Link,useParams} from 'react-router-dom'
import "./Styles/Dashboard.css"
function Dashboard() {
  const [Firstname,setFirstname]=useState('')
  const user = auth.currentUser.uid
  let currentId = useParams();
    const uid=currentId;
  useEffect(()=>{
    
    db.ref(`/TollgateAdmin/`+ user).on('value',snap=>{
      
      setFirstname(snap.val() && snap.val().Firstname);
    })
    
  },[])
  const [Tollgate,setTollgate]=useState([])
  const [Booking,setBooking]=useState([])
  useEffect(()=>{
    db.ref('Tollgate').on('value',snap=>{
      
      setTollgate({...snap.val(),});
    })
    db.ref('TollPayment').on('value',snap=>{
      
      setBooking({...snap.val(),});
    })
    
  },[])

var count =0
var count2 =0
    return (<>
 
      <div className='viewRow'>
      <h4 >WELCOME BACK</h4>
        <h6 >{Firstname}</h6>
      </div>
      
        <div className='container mt-3'>
        <div className='row'>
        {
          Object.keys(Tollgate).map((id,items)=>
          {count += 1}
  
          )
        }
         {
          Object.keys(Booking).map((id,items)=>
          {count2 += 1}
  
          )
        }
        <div className='viewRow'>
        <div className='box'>
        <div className='input_column'>
        <h1>{count}</h1>
        <p>Toll Gates</p>
        </div>
        </div>
        <div className='box'>
        <div className='input_column'>
        <h1>{count2}</h1>
        <p>Payments</p>
        </div>
        </div>
        </div>
         </div>
     </div>

      </>
     )
}

export default Dashboard
