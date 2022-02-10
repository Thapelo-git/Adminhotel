import React,{useState,useEffect} from 'react'
import ImageUploading from 'react-images-uploading';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth,db } from '../firebase';
function Dashboard() {
  const [Firstname,setFirstname]=useState('')
  const user = auth.currentUser.uid
  useEffect(()=>{
    db.ref(`/admin/`+ user).on('value',snap=>{
      
      setFirstname(snap.val() && snap.val().Firstname);
    })
    
  },[])

 
    return (
      <div className="container my-5">
           <div className="row">
        <div 
        className="col-md-20 mx-auto col-12 card shadow-lg border-0 p-8">
         {/* <div>
            <h1 className="display-4 text-center">Add Hotel </h1>
          </div> */}
      <div className="notification text-end p-4">
          <i class="bi bi-bell-fill not-icon text-white"></i>
    </div>
        <h4 className="fw-bold p-4 text-secondary header">WELCOME BACK</h4>
        <h6 className="fw-bold p-4 name">{Firstname}</h6>
        
      <hr/>
      </div>
      </div>
      </div>
 
    
  
  
    
     
 
      
    )
}

export default Dashboard
