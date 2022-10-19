import React,{useEffect,useState} from 'react'
import {Table} from "react-bootstrap";
import { auth,db } from '../firebase';
import {Link,useParams} from 'react-router-dom'
import "./Styles/TollgateList.css"
function Guests() {


  const [name,setname]=useState('')
  const [phonenumber,setPhonenumber]=useState('')
  const [email,setEmail]=useState('')
  const [uid,setUid]=useState('')
  const user = auth.currentUser.uid
 
  const [Tollgate,setTollgate]=useState([])
  useEffect(()=>{
    
    db.ref('/Tollgate/').on('value',snap=>{
      
      setTollgate({...snap.val()});
    })
    
  },[])
  const onDelete =(id)=>{
    db.ref(`/Tollgate/${id}`).remove()
   
   }
    return (
        <div>
          <div className='headings'>
        <h3>List of Toll Plaze</h3>
      </div>
               <div className='users_container'>
              {
              // Object.keys(user).length>0?(
                Object.keys(Tollgate).map((id,index)=>{
                  return(

                 
            <div className='users'>
            <img src={Tollgate[id].url} className="profile_pic"/>
            <p>{Tollgate[id].name} </p>
            <p>{Tollgate[id].Route}</p>
            <button className='deletebtn' onClick={()=>onDelete(id)}>Delete</button>
            {/* <Link to={`ViewToll/${id}`}><i className='fas fa-chevron-right'></i></Link> */}
            
            </div>
             )
            })
          // ):(<h3>No Users</h3>)
          }
            </div> 
     
        </div>
    )
}

export default Guests
