import React,{useState} from 'react'
import '../components/Styles/Welcome.css'
import Register from './Register'
import SignIn from './SignIn'
const Welcome = () => {
    const [page,setPage]=useState(0)
  return (
    <div className='Centercover'>
        
        <div>
        <div className='butten_container'>
        <div style={{borderBottomWidth:1,
                borderColor: page === 0 ?'#4A1DD6':'#000',
                  display:'flex',justifyContent:'center',alignItems:'center',
                  width:'180px',height:'100px',cursor:'pointer',
                }}
                onClick={()=>setPage(0)}
                >
                  <p style={{color: page === 0 ?'#4A1DD6':'gray',fontSize:25}}>Login</p>
                </div>
        <div style={{borderBottomWidth:5,
            
            borderColor: page === 1 ?'#4A1DD6':'#000',alignItems:'center',
            width: '120px',display:'flex',justifyContent:'center',cursor:'pointer',
            height: '44px'}}
            onClick={()=>setPage(1)}
             >
              <p style={{color:page === 1 ?'#4A1DD6':'gray',fontSize:25}}>Register</p>
                        </div>
        </div>
        <div>
            {
                page===0?<SignIn/>:null  
            }
             {
                page===1?<Register/>:null  
            }
        </div>
        </div>
    </div>
  )
}

export default Welcome