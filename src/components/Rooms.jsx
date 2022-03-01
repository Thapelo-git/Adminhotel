import React,{useState}  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUploading from 'react-images-uploading';
import { auth ,db} from '../firebase'
import { Link,useHistory } from 'react-router-dom'
import { v4 } from "uuid";
import { storage } from '../firebase';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Rooms.css'
function Rooms() {
  const history = useHistory()
  const uid = v4();
  const [name, setName] = useState("");
  const [type, settype] = useState("");
  const [price, setprice] = useState(0);
  const [size, setsize] = useState(0);
  const [location, setlocation] = useState(1);
  const [wifi, setwifi] = useState(false);
  const [pool, setpool] = useState(false);
  const [food, setfood] = useState(false);
  const [gym, setgym] = useState(false);
  const [description, setdescription] = useState("");
  const [extras, setextras] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  
  const [image, setImage] = useState(null);
  const [roomimage, setRoomimage] = useState(null);
  const [roomimage2, setRoomimage2] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const [beds, setBeds]  = useState(0);
  const [bedType , setBedType] = useState('');
  const [desc , setDesc] = useState();
  const [roomname, setRoomname] =useState('');
  const [roomurl, setroomurl] = useState("");
  const [beds2, setBeds2]  = useState(0);
  const [bedType2 , setBedType2] = useState('');
  
  const [roomname2, setRoomname2] =useState('');
  const [roomurl2, setroomurl2] = useState("");
  const [url, setUrl] = useState();
  const addRoomToFirebase = () => {
    if (
      name &&
      type &&
      price &&
      size &&
      location 
      //roomname && roomurl && bedType && beds
      // wifi &&
      // pool &&
      // food &&
      // gym &&
      // image1
    //  set(ref(db, `hotels/${uid}`),
    ) {db.ref('/hotels').child(uid).set(
       {
        sys: {
          id: uid,
        },
        
          name,
          // slug: uid.toString(),
          type,
          price,
          size,
          location,
          wifi,
          pool,
          food,
          gym,
          url,
          room:[{
            roomname:roomname,roomurl:roomurl,
            bedType:bedType,beds:beds
          },
          {
            roomname:roomname2,roomurl:roomurl2,
            bedType:bedType2,beds:beds2
          }
        ],
        
      
        
      }).then(() => {
        alert("Room Added!");
        setName("");
        settype("");
        setlocation('');
        
        setpool(false);
        setwifi(false);
        setfood(false);
        setgym(false);
        setprice(0);
        setsize(0);
        // setImage1("");
        

        history.push('/Dashboard');
      });
    } else {
      return alert("Please fill all required fields.");
    }
  };
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      
    }
  };
  const handleChangeRoom = e => {
    if (e.target.files[0]) {
      setRoomimage(e.target.files[0]);
      
    }
  };
  const handleChangeRoom2 = e => {
    if (e.target.files[0]) {
      setRoomimage2(e.target.files[0]);
      
    }
  };
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
  const handleUploadRoomimage = () => {
    const uploadTask = storage.ref(`images/${roomimage.name}`).put(roomimage)
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
          .child(roomimage.name)
          .getDownloadURL()
          .then(url => {
            setroomurl(url);
          });
      }
    );
  };
  const handleUploadRoomimage2 = () => {
    const uploadTask = storage.ref(`images/${roomimage2.name}`).put(roomimage2)
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
          .child(roomimage2.name)
          .getDownloadURL()
          .then(url => {
            setroomurl2(url);
          });
      }
    );
  };

  const [images, setImages] = React.useState([]);
    const maxNumber = 69;
  
    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };
    return (
      
      <div className="row">
      <div className="col-md-7 mx-auto col-12 card shadow-lg border-0 p-4">
        <div>
        {url}
              <img src={url || "https://media.istockphoto.com/vectors/welcome-hotel-services-on-vector-illustration-vector-id1172931964?k=20&m=1172931964&s=612x612&w=0&h=n8tpGi16ZTNU1quhN-GjONLcgVe6xgzJ2-QaD4_MVU4="} alt="firebase-image" />
          {/* <h1 className="display-4 text-center">Add Hotel </h1> */}
        </div>

        <div className="row my-4">
          <div className="col-md-12 col-12 my-auto">
            <div className="col-md-12 col-12 float-right">
              <form>
        
                <div className="form-group">
                <div class="mb-3 row">
                <label htmlFor="name" class="col-sm-4 col-form-label">Hotel Name</label>
  <div class="col-sm-8">
  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="Hotel name."
                    required
                  />
  </div>
</div>
                  
<div class="mb-3 row">
                  <label htmlFor="type" class="col-sm-4 col-form-label">Address</label>
                  <div class="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={type}
                    onChange={(e) => settype(e.target.value)}
                    id="type"
                    placeholder="Address"
                    required
                  />
            </div>
            </div>
            <div class="mb-3 row">
                  <label htmlFor="price" class="col-sm-4 col-form-label">Price</label>
                  <div class="col-sm-8">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    className="form-control"
                    required
                    id="price"
                    placeholder="Room price"
                  />
                  </div>
                  </div>
                  <div class="mb-3 row">
                  <label htmlFor="size" class="col-sm-4 col-form-label">Number of Room </label>
                  <div class="col-sm-8">
                  <input
                    type="number"
                    className="form-control"
                    value={size}
                    onChange={(e) => setsize(e.target.value)}
                    required
                    id="size"
                    placeholder="Room Size"
                  />
                  </div>
                  </div>
                  <div class="mb-3 row">
                  <label htmlFor="location" class="col-sm-4 col-form-label">location</label>
                  <div class="col-sm-8">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                    className="form-control"
                    required
                    id="location"
                    placeholder="location"
                  />
                  </div>
                  </div>
                  <div className="row">
                  <div className="col">
                  <div className="custom-control custom-checkbox my-2">
                    <input
                      type="checkbox"
                      // className="custom-control-input"
                      
                      checked={pool}
                      onChange={() => setpool(!pool)}
                      name="pool"
                      id="pool"
                    />
                    
                    <label
                      htmlFor="pool"
                      className="custom-control-label col-sm-5"
                    >
                         pool
                    </label>
                  </div>
                  </div>
                  <div className="col">
                  <div className="custom-control custom-checkbox my-1">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      name="wifi"
                      checked={wifi}
                      onChange={() => setwifi(!wifi)}
                      id="wifi"
                    />
                    <label htmlFor="wifi" className="custom-control-label col-sm-5">
                         wifi
                    </label>
                  </div>
                  </div>
                  <div className="col">
                  <div className="custom-control custom-checkbox my-1">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      name="food"
                      checked={food}
                      onChange={() => setfood(!food)}
                      id="food"
                    />
                    <label htmlFor="food" className="custom-control-label col-sm-5">
                       food
                    </label>
                  </div>
                  </div>
                  <div className="col">
                  <div className="custom-control custom-checkbox my-1">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      name="gym"
                      checked={gym}
                      onChange={() => setgym(!gym)}
                      id="gym"
                    />
                    <label htmlFor="gym" className="custom-control-label col-sm-5">
                        gym
                    </label>
                  </div>
                  </div>
                  </div>
               
                  <input name="url" onChange={handleChange} style={{width:'50%'}} type="file" class="form-control" />
              <button className="btn-success" onClick={handleUpload}>Upload</button>
              <progress value={progress} max="1000" />
              <section className="features top mt-4" id="features">
              <div className="content grid" >
              <div className="box btn_shadow" onClick={handleClickOpen} >
                
                <h2>Standard Room</h2>
                <p>Add Room</p>
                <a href="">
                    <i className="fas fa-arrow-right"></i>
                </a>
                </div>
                <div className="box btn_shadow" onClick={handleClickOpen2} >
                
                <h2>Executive Room</h2>
                <p>Add Room</p>
                <a href="">
                    <i className="fas fa-arrow-right"></i>
                </a>
                </div>
                  {/* <button className="bg-info" onClick={handleClickOpen}> Add New Room </button>
                  <button className="bg-info" onClick={handleClickOpen2}> Add second Room </button> */}
                  </div>
                  </section>
                  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{alignItems: 'center'}}
      >
        <DialogTitle style={{ color: '#00BFFF', borderBottom: "#00BFFF", boderWidth: 1 }} id="alert-dialog-title">
          Add Room
        </DialogTitle>
        <DialogContent>
        <div class=" mb-3">
          {/* onSubmit = {Room} */}
            {/* <form > */}
            <div class="input-group mb-6">
            <div class="input-group-prepend">
            <label class="input-group-text" for="gender3">Room Type</label>
          </div>
              <select class="custom-select" id="gender3" 
          value={roomname} onChange={(e) => setRoomname(e.target.value)} >
            <option selected>Choose...</option>
            <option  name="Standard Room" >Standard Room</option>
            <option name="Executive Room" >Executive Room</option>
          </select>
          </div>
          <div class="input-group mb-6 mt-4 ">
          <div class="input-group-prepend">
            <label class="input-group-text" for="gender3">Bed Type</label>
          </div>
              <select class="custom-select" id="gender3" 
        value={bedType}  onChange={(e) => setBedType(e.target.value)} >
            <option selected>Choose...</option>
            <option  name="2 king beds" >2 king beds</option>
            <option name="1 Queen bed" >1 Queen bed</option>
            <option name="1 king bed" >1 king bed</option>
          </select>
          </div>
              <label style={{ color: '#00BFFF',fontSize:15 }}>Room Price </label>
              <input  value={beds} type="number"    onChange={(e) => setBeds(e.target.value)} style={{width:'80%'}} class="form-control" />
              
              <label style={{ color: '#00BFFF' }}>Room image</label>
              {/* onChange={handleChange} */}
              <input name="roomurl" onChange={handleChangeRoom}  style={{width:'50%'}} type="file" class="form-control" />
              <button className=" btn-success mt-4" onClick={handleUploadRoomimage}>Upload</button>
              <progress value={progress} max="1000" />
              <br />
              <img src={roomurl || "http://via.placeholder.com/300"} alt="firebase-image"/>
             
          
            
            {/* </form> */}
            </div>

        <DialogContentText style={{width:'50%'}} id="alert-dialog-description">
            ****************************************************************************************************************************************************
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleClose} autoFocus>
            ADD
          </Button>
        </DialogActions>
      </Dialog>

      
                  <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{alignItems: 'center'}}
      >
        <DialogTitle style={{ color: '#00BFFF', borderBottom: "#00BFFF", boderWidth: 1 }} id="alert-dialog-title">
          Add Room
        </DialogTitle>
        <DialogContent>
        <div class=" mb-3">
          {/* onSubmit = {Room} */}
            {/* <form > */}
            
              <div class="input-group mb-6">
            <div class="input-group-prepend">
            <label class="input-group-text" for="gender3">Room Type</label>
          </div>
              <select class="custom-select" id="gender3" 
          value={roomname2} onChange={(e) => setRoomname2(e.target.value)} >
            <option selected>Choose...</option>
            <option  name="Standard Room" >Standard Room</option>
            <option name="Executive Room" >Executive Room</option>
          </select>
          </div>
          <div class="input-group mb-6 mt-4">
          <div class="input-group-prepend">
            <label class="input-group-text" for="gender3">Bed Type</label>
          </div>
              <select class="custom-select" id="gender3" 
        value={bedType2}  onChange={(e) => setBedType2(e.target.value)} >
            <option selected>Choose...</option>
            <option  name="2 king beds" >2 king beds</option>
            <option name="1 Queen bed" >1 Queen bed</option>
            <option name="1 king bed" >1 king bed</option>
          </select>
          </div>
          <label style={{ color: '#00BFFF' }}>Room Price</label>
              <input  value={beds2} type="number"    onChange={(e) => setBeds2(e.target.value)} style={{width:'80%'}} class="form-control" />
              
              <label style={{ color: '#00BFFF' }}>Room image</label>
              {/* onChange={handleChange} */}
              <input name="roomurl" onChange={handleChangeRoom2}  style={{width:'50%'}} type="file" class="form-control" />
              <button className=" btn-success" onClick={handleUploadRoomimage2}>Upload</button>
              <progress value={progress} max="1000" />
              <br />
              <img src={roomurl2 || "http://via.placeholder.com/300"} alt="firebase-image"/>
             
          
   
            {/* </form> */}
            </div>

        <DialogContentText style={{width:'50%'}} id="alert-dialog-description">
           **********************************************************************************************
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>CANCEL</Button>
          <Button onClick={handleClose2} autoFocus>
            ADD
          </Button>
        </DialogActions>
      </Dialog>

              <br />
              
                  {/* <label htmlFor="img2">Image 2</label>

                  <label htmlFor="img3">Image 3</label>
                  <input
                    type="text"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    className="form-control"
                    id="img3"
                    placeholder="Image 3 URL"
                    required
                  />

                  <label htmlFor="img4">Image 4</label>
                  <input
                    type="text"
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                    className="form-control"
                    id="img4"
                    placeholder="Image 4 URL"
                    required
                  /> */}
                </div>

                <div className="form-group form-check">
                {/* <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <button
            style={isDragging ? { color: 'red' } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </button>
          &nbsp;
          <button onClick={onImageRemoveAll}>Remove all images</button>
          {imageList.map((image, index) => (
            <div className="row">
             
            <div key={index} className="card" style={{width:"18rem"}}>
              <img src={image['data_url']} alt="" className="card-img-top" width="100" />
              <div className="card-body">
              <div className="row">
  <div className="col">
  <button className="btn btn-primary" onClick={() => onImageUpdate(index)}>Update</button>
  </div>
  <div className="col">
  <button className="btn btn-primary" onClick={() => onImageRemove(index)}>Remove</button>
  </div>
  </div>
                
                
              </div>
            </div>
            </div>
            
          ))}
        </div>
        
      )}
    </ImageUploading> */}
                </div>
              </form>
              <button
                className="btn btn-block btn-outline-primary"
                onClick={addRoomToFirebase}
              >
                ADD Hotel
              </button>
        
              
           
            </div>
          </div>
        </div>
      </div>
      
    </div>
  


  
   
    )
}

export default Rooms
