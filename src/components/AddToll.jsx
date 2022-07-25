import React, { useState } from 'react'
import "./Styles/Addprices.css"
import Addprices from './Addprices'
import Guests from './Guests'
export const AddToll = () => {
    const [page,setPage]=useState(0)
  return (
    <div>
          <div className='button-container'>
                {/* className='Regis-button' '#EC8F05' */}
                <div style={{borderRadius: '10px',
            
    backgroundColor: page === 0 ?'#4A1DD6':'gray',alignItems:'center',
    width: '120px',display:'flex',justifyContent:'center',cursor:'pointer',
    height: '44px'}}
    onClick={()=>setPage(0)}
     >
      <p style={{color:page === 0 ?'#fff':'#000'}}>Add Tollgate</p>
                </div>
                <div style={{borderRadius: '10px',
                backgroundColor: page === 1 ?'#4A1DD6':'gray',
                  display:'flex',justifyContent:'center',alignItems:'center',
                  width:'120px',height:'44px',cursor:'pointer',
                }}
                onClick={()=>setPage(1)}
                >
                  <p style={{color: page === 1 ?'#fff':'#000'}}>Tollgate List</p>
                </div>
            </div>
            <div>
            {
              page===0?<Addprices/>:null
            }
            {
              page===1?<Guests/>:null
            }
            </div>
    </div>
  )
}
