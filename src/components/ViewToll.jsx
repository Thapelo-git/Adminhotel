import React,{useState,useEffect} from 'react'
import "./Styles/ViewToll.css"
import { useParams } from 'react-router-dom'

import {db} from "../firebase"
const ViewToll = () => {

    const [data,setData]=useState({})
    let currentId = useParams()
    const {id}=currentId;
  
    useEffect(()=>{
      db.ref("/Tollgate/").on("value",(snap)=>{
        setData({
          ...snap.val(),
        })
      })
    },[id]);
    const [TollClass,setTollClass]=useState({})
    useEffect(()=>{
      db.ref('TollClasses').on('value',(snapshot)=>{
        setTollClass({
          ...snapshot.val(),
        })
      })
    },[])
    const onDelete =(id)=>{
      db.ref(`/TollClasses/${id}`).remove()
     
     }
  return (
    <div>
      
        <div className='downcover'>
        <div className='headings'>
      
      </div>
        <div className='viewRow'>
        <div>
      {
      Object.keys(data).map((userId)=>{
        if(userId === id){
          return(<>
            
           
               <div className='input_column'>
          <div className='imageCover'>
          <img src={data[id].url} className="image"/>
      </div>
      <div className='inforRow'>
         <p>Name</p> <h3> {data[id].name}</h3> 
         </div>
         <div className='inforRow'><p>Route</p> <h3> {data[id].Route}</h3></div>
         </div>

         </>
         

          )
        }
      })
    }
    </div>
   <div>
    {
      Object.keys(TollClass).map((id)=>{
        
          return(<> 
         <div className='viewRow'>
        
         <h4>{TollClass[id].TollClass}</h4>
          <h4>:    R  {TollClass[id].Price}</h4>
          
          
          
          </div>
         
         
       

</>
         

)

})
}
</div>
</div>
{/* <div className='headings'>
          <button  className='button'><label className='button_Lable'>Delete</label></button>
        </div> */}
    </div>
    </div>
  )
}

export default ViewToll