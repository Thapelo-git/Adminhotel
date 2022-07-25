import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { db, } from '../firebase';
import { storage } from '../firebase';

import "./Styles/Addprices.css"
function Addprices() {
    let navigate =useHistory()
    const values={
        name:'',Route:'',Road:'',
   
      }
      const [Tollgates,setTollgates]=useState([])
      useEffect(()=>{
        db.ref('TollClasses').on('value',(snapshot)=>{
          setTollgates({
            ...snapshot.val(),
          })
        })
      },[])
      const [url, setUrl] = useState();
      const [image,setImage]=useState(null)
      const handleImgChange=e=>{
        if(e.target.files[0]){
          setImage(e.target.files[0])
        }
      }
      const [progress, setProgress] = useState(0);
      const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
          ;
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                setUrl(url);
              });
          }
        );
      };
      const [initialState,setState]=useState(values)
      const {name,Route,Road,

    }=initialState
     
      const handleInputChange=(e)=>{
        let {name,value}=e.target;
        setState({
          ...initialState,
          [name]:value,
        })
      }
      const handleSubmit = (e)=>{
        e.preventDefault();
        
            db.ref('Tollgate').push({name,Route,Road,
              url})
              
      
    }
  
    
  
  return (
    <>
    <div className='Add_cover'>
      <div className='headings'>
        <h3>Upload Information</h3>
      </div>
      <div className='img_row'>
        
      <img src={url || "https://media.istockphoto.com/vectors/welcome-hotel-services-on-vector-illustration-vector-id1172931964?k=20&m=1172931964&s=612x612&w=0&h=n8tpGi16ZTNU1quhN-GjONLcgVe6xgzJ2-QaD4_MVU4="} 
      alt="firebase-image" className='image1'/>
      </div>
      <div className='img_row'>
      <input name="url" onChange={handleImgChange} style={{width:'50%'}} type="file" class="form-control"
      placeholder={url} />
              <button className="btn-success" onClick={handleUpload}>Upload</button>
              <progress value={progress} max="1000" />
              </div>
      {/* <div className='img_cover'>
   
      </div> */}
      <div className='form_cover'>
      <form onSubmit={handleSubmit}>
        <div className='input_row'>
          <div className='input_column'>
          <label>Name</label>
            <input name='name' type='text' className='input_infor' required="required"
            onChange={handleInputChange} value={name} />
           
          </div>
          <div className='input_column'>
          <label>Route</label>
            <input name='Route' type='text' className='input_infor' required="required" 
            onChange={handleInputChange} value={Route} />
         
          </div>
          <div className='input_column'>
            <label>Road</label>
            <select class="custom-select" id="Road" name='Road'
          value={Road} onChange={handleInputChange} >
            <option selected>Choose...</option>
            <option  name="Mainline" >Mainline</option>
            <option name="Ramp" >Ramp</option>
           
          </select>
          </div>
          
        </div>
      
        
     

        <div className='headings'>
          <button type='submit' className='button'><label className='button_Lable'>Submit</label></button>
        </div>
      </form>
      </div>
    </div>
    </>
  )
}

export default Addprices