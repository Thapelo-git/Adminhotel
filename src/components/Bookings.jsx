import React,{useState,useEffect} from 'react'
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { auth,db } from '../firebase';
import { Pagination } from '@mui/material';
import PaginationItem from '@mui/material/PaginationItem';
//https://dribbble.com/shots/18904774-Online-Auction-App
//https://dribbble.com/shots/17571451-Baby-Diary-App-Concept
import {FaCheckCircle,FaTimesCircle,} from 'react-icons/fa'
const StatusTD = styled.td`
  font-weight: bold;
  color: ${(props) => (props.type === "Pending" ? "blue" : "")};
  color: ${(props) => (props.type === "Completed" ? "green" : "")};
  color: ${(props) => (props.type === "Cancelled" ? "red" : "")};
`;
export const Bookings = () => {
  const [Booking,setBooking]=useState([])
  useEffect(()=>{
    
    db.ref('TollPayment').on('value',snap=>{
      
      setBooking({...snap.val()});
    })
    
  },[])
       {/* <Pagination
  count={10}

  onLoadedData={Booking}
  renderItem={(item) => (
    <PaginationItem
      // components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
      {...item}
    />
  )}
/> */}
  const updateBooking = (index, status) => {

    db.ref('TollPayment').child(index).update({Status:status})
    .then(()=>db.ref('TollPayment').once('value'))
    .then(snapshot=>snapshot.val())
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message
    }));
    
    
  };
  console.log(Booking)
    return (
        <div className='container'>
          {/* <div className='heading'>
            <h4>Payments</h4>
          </div> */}
        <div className='content grid'>
        {Object.keys(Booking).map((id,booking) => (
          <div className='box btn_shadow'>
                <tr >
                  {/* <p>Ticket ID</p> */}
                  <p>{id}</p>
                  <div className='viewRow'>
                  <td>{Booking[id].datetoday}</td>
                  <td>{Booking[id].hotelname}</td>
                  </div>
                  <div className='viewRow'>
                  <td>{Booking[id].Classes}</td>
                  <td>R {Booking[id].price}</td>
                  </div>
                  <div className='viewRow'>
                  <td>No Plate {Booking[id].NoPlate}</td>
                  <td>{Booking[id].VehicleName}</td>
                  </div>
                  <StatusTD type={Booking[id].Status}>{Booking[id].Status}</StatusTD>
                  {Booking[id].Status === "Pending" ? (
                    <>
                      <td style={{ textAlign: "center" }}>
                        <FaCheckCircle
                          color="green"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(id, "Completed")}
                        />
                      </td>
                     
                    </>
                  ) : (
                    <></>
                  )}
                
                </tr>
                </div>
                ))}
                
        </div>
            {/* <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "80px", width: "90%", margin: "80px auto" }}
        >
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date created</th>
              
              <th>Tollgate name </th>
              
              <th>Class choosen</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(Booking).map((id,booking) => (
                <tr >
                  <td>{id}</td>
                  <td>{Booking[id].datetoday}</td>
                  <td>{Booking[id].hotelname}</td>
                  <td>{Booking[id].Classes}</td>
                  <td>R {Booking[id].price}</td>
                  <StatusTD type={Booking[id].Status}>{Booking[id].Status}</StatusTD>
                  {Booking[id].Status === "Pending" ? (
                    <>
                      <td style={{ textAlign: "center" }}>
                        <FaCheckCircle
                          color="green"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(id, "Completed")}
                        />
                      </td>
                     
                    </>
                  ) : (
                    <></>
                  )}
                
                </tr>
                
                ))}
            
          </tbody>
        </Table> */}
        </div>
    )
}
