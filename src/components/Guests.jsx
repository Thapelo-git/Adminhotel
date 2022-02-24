import React,{useEffect,useState} from 'react'
import {Table} from "react-bootstrap";
import { auth,db } from '../firebase';
import {Link,useParams} from 'react-router-dom'
function Guests() {


  const [name,setname]=useState('')
  const [phonenumber,setPhonenumber]=useState('')
  const [email,setEmail]=useState('')
  const [uid,setUid]=useState('')
  const user = auth.currentUser.uid
 
  const [Guests,setGuests]=useState([])
  useEffect(()=>{
    
    db.ref('/users/').on('value',snap=>{
      
      setGuests({...snap.val()});
    })
    
  },[])
  console.log(Guests)
    return (
        <div>
         <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "80px", width: "90%", margin: "80px auto" }}
        >
        
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
          {Object.keys(Guests).map((id,) => (
                <tr>
                  <td>{Guests[id].uid}</td>
                  <td>{Guests[id].email}</td>
                  <td>{Guests[id].name}</td>
                  <td>{Guests[id].phonenumber}</td>
                  <td></td>
                  
                 
                 
                
                </tr>
               ))}
                
              
           
          </tbody>
          
        </Table>
        </div>
    )
}

export default Guests
