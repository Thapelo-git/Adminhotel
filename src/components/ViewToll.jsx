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
    
  return (
    <div>
        
      {
      Object.keys(data).map((userId)=>{
        if(userId === id){
          return(<div className='downcover'>
              <div className='headings'>
      
      </div>
           <div className='viewRow'>
               <div className='input_column'>
          <div className='imageCover'>
          <img src={data[id].url} className="image"/>
      </div>
      <div className='inforRow'>
         <p>Name</p> <h3> {data[id].name}</h3> 
         </div>
         <div className='inforRow'><p>Route</p> <h3> {data[id].Route}</h3></div>
         </div>
          <div>
         
         <div className='viewRow'>
         <div className='input_column'>
          <h4>Class 1</h4>
          <h4>R  {data[id].Class1}</h4>
          <p>All light vehicles</p>
          </div>
          <div className='input_column'>
          <h4>Class 2</h4>
          <h4>R  {data[id].Class2}</h4>
          <p>Medium heavy vehicles</p>
          </div>
          </div>
          <div className='viewRow'>
          <div className='input_column'>
          <h4>Class 3</h4>
          <h4>R  {data[id].Class3}</h4>
          <p>Large heavy vehicles</p>
          </div>
          <div className='input_column'>
          <h4>Class 4</h4>
          <h4>R  {data[id].Class4}</h4>
          <p>Extra large heavy vehicles</p>
          </div>
         </div>
         <div className='headings'>
          <button  className='button'><label className='button_Lable'>Delete</label></button>
        </div>
        </div></div>
</div>
          )
        }
      })
    }
    </div>
  )
}

export default ViewToll