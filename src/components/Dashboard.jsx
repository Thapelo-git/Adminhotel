import React,{useState} from 'react'
import ImageUploading from 'react-images-uploading';
import 'bootstrap/dist/css/bootstrap.min.css';
function Dashboard() {


  const [name, setName] = useState("");
  const [type, settype] = useState("");
  const [price, setprice] = useState(0);
  const [size, setsize] = useState(0);
  const [capacity, setcapacity] = useState(1);
  const [wifi, setwifi] = useState(false);
  const [pool, setpool] = useState(false);
  const [food, setfood] = useState(false);
  const [gym, setgym] = useState(false);
  const [description, setdescription] = useState("");
  const [extras, setextras] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
  
    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };
    return (
        
          // <div className="container my-5">
      <div className="row">
        <div className="col-md-7 mx-auto col-12 card shadow-lg border-0 p-4">
          <div>
            <h1 className="display-4 text-center">Add Hotel </h1>
          </div>

          <div className="row my-4">
            <div className="col-md-12 col-12 my-auto">
              <div className="col-md-12 col-12 float-right">
                <form>
                <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"/>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword"/>
    </div>
  </div>
                  <div className="form-group">
                    <label htmlFor="name">Hotel Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      placeholder="Hotel name."
                      required
                    />
                    <label htmlFor="type">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={type}
                      onChange={(e) => settype(e.target.value)}
                      id="type"
                      placeholder="Address"
                      required
                    />

                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                      className="form-control"
                      required
                      id="price"
                      placeholder="Room price"
                    />
                    <label htmlFor="size">Room Type</label>
                    <input
                      type="number"
                      className="form-control"
                      value={size}
                      onChange={(e) => setsize(e.target.value)}
                      required
                      id="size"
                      placeholder="Room Size"
                    />
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setcapacity(e.target.value)}
                      className="form-control"
                      required
                      id="capacity"
                      placeholder="Capacitiy"
                    />
                    <div className="row">
                    <div className="col">
                    <div className="custom-control custom-checkbox my-1">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        checked={pool}
                        onChange={() => setpool(!pool)}
                        name="pool"
                        id="pool"
                      />
                      <label
                        htmlFor="pool"
                        className="custom-control-label"
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
                      <label htmlFor="wifi" className="custom-control-label">
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
                      <label htmlFor="food" className="custom-control-label">
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
                      <label htmlFor="gym" className="custom-control-label">
                          gym
                      </label>
                    </div>
                    </div>
                    </div>
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      id="description"
                      placeholder="Short description of room."
                      rows="3"
                    ></textarea>

                    <label htmlFor="extras">Extras</label>
                    <textarea
                      className="form-control"
                      value={extras}
                      onChange={(e) => setextras(e.target.value)}
                      id="extras"
                      placeholder="Separated by comma ( , )"
                      rows="3"
                    ></textarea>

                    <label htmlFor="img1">Image 1</label>
                    <input
                      type="text"
                      value={image1}
                      onChange={(e) => setImage1(e.target.value)}
                      className="form-control"
                      id="img1"
                      placeholder="Image 1 URL"
                      required
                    />
                    <label htmlFor="img2">Image 2</label>
                    <input
                      type="text"
                      className="form-control"
                      value={image2}
                      onChange={(e) => setImage2(e.target.value)}
                      id="img2"
                      placeholder="Image 2 URL"
                      required
                    />

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
                    />
                  </div>

                  <div className="form-group form-check">
                  <ImageUploading
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
      </ImageUploading>
                  </div>
                </form>
                <button
                  className="btn btn-block btn-outline-primary"
                
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

export default Dashboard
