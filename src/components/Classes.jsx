import React,{useState,useEffect} from 'react'
import "./Styles/Classes.css"
import { db } from '../firebase'
export const Classes = () => {
    const [TollClass,setTollClass]=useState('')
    const [Price,setPrice]=useState('')
    const SubmitClasses = (e)=>{
      // e.preventDefault();
      
          db.ref('TollClasses').push({TollClass,Price
        })
        
  }
    const [Tollgates,setTollgates]=useState([])
    useEffect(()=>{
      db.ref('TollClasses').on('value',(snapshot)=>{
        setTollgates({
          ...snapshot.val(),
        })
      })
    },[])
    const onDelete =(id)=>{
      db.ref(`/TollClasses/${id}`).remove()
     
     }
  return (
    <div>
           <div className='input_row'>
      <h3>Select Vehicle Class</h3>
            <select class="custom-select" id="TollClass" name='TollClass'
          value={TollClass}  onChange={e=>setTollClass(e.target.value)} >
            <option selected>Choose...</option>
            <option  name="ClassOne" >ClassOne</option>
            <option name="ClassTwo" >ClassTwo</option>
            <option name="ClassThree" >ClassThree</option>
            <option name="ClassFour" >ClassFour</option>
          </select>
          <h3>Price for Vehicle Class</h3>
          <input name='Price' type='number' className='input_infor' required="required"
    onChange={e=>setPrice(e.target.value)} value={Price} />

         
        </div>
        <div className='headings'><button className='Classbtn' onClick={()=>SubmitClasses()}>Add Class</button></div>
        <div className='input_row'>
        {
        Object.keys(Tollgates).map((id)=>
      
        <div className='input_column'>
          <h4>{Tollgates[id].TollClass}</h4>
          <p>R {Tollgates[id].Price}</p>
          <button className='deletebtn' onClick={()=>onDelete(id)}>Delete</button>
          </div>
  
        )
      }
</div>
    </div>
  )
}
