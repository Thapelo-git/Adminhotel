import React,{useState,useEffect} from 'react'
import "./Styles/ViewToll.css"
import { useParams } from 'react-router-dom';
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
    console.log(data,"55555555555555555",id)
  return (
    <div>
        <div className='headings'>
        <h3>Full Information</h3>
      </div>
      {
      Object.keys(data).map((userId)=>{
        if(userId === id){
          return(<>
          <div className='headings'>
          <img src={data[id].url} className="image"/>
      </div>
          
          <div className='inforRow'>
         <p>Name</p> <h3> {data[id].name}</h3> 
         </div>
         <div className='inforRow'><p>Route</p> <h3> {data[id].Route}</h3></div>
         <div className='viewRow'>
         <div className='input_column'>
          <h4>Class 1</h4>
          <h4>R  {data[id].Class1}</h4>
          <p>All light vehicles</p>
          </div>
  
          
         </div>
         <div className='headings'>
          <button  className='button'><label className='button_Lable'>Delete</label></button>
        </div>
</>
          )
        }
      })
    }
    </div>
  )
}

export default ViewToll