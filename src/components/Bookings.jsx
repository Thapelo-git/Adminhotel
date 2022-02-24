import React,{useState,useEffect} from 'react'
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { auth,db } from '../firebase';
const StatusTD = styled.td`
  font-weight: bold;
  color: ${(props) => (props.type === "Pending" ? "blue" : "")};
  color: ${(props) => (props.type === "Completed" ? "green" : "")};
  color: ${(props) => (props.type === "Cancelled" ? "red" : "")};
`;
export const Bookings = () => {
  const [Booking,setBooking]=useState([])
  useEffect(()=>{
    
    db.ref('Booking').on('value',snap=>{
      
      setBooking({...snap.val()});
    })
    
  },[])
  console.log(Booking)
    return (
        <div>
            <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "80px", width: "90%", margin: "80px auto" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>CREATED</th>
              <th>GUESTS</th>
              <th>Nummber Room </th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>No.Geusts</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(Booking).map((id,booking) => (
                <tr >
                  <td>{id}</td>
                  <td>MOLOBE@GMAIL.COM</td>
                  <td>Molobe</td>
                  <td>SINGLE</td>
                  <td>{Booking[id].checkin}</td>
                  <td>{Booking[id].checkout}</td>
                  <td>{Booking[id].adultPlus}</td>
                  <td>R {Booking[id].totPrice}</td>
                  <StatusTD type={Booking[id].Status}>{Booking[id].Status}</StatusTD>
                 
                
                </tr>
                
                ))}
            
          </tbody>
        </Table>
        </div>
    )
}
