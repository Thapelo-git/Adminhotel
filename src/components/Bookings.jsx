import React from 'react'
import Table from "react-bootstrap/Table";
import styled from "styled-components";

const StatusTD = styled.td`
  font-weight: bold;
  color: ${(props) => (props.type === "Pending" ? "blue" : "")};
  color: ${(props) => (props.type === "Completed" ? "green" : "")};
  color: ${(props) => (props.type === "Cancelled" ? "red" : "")};
`;
export const Bookings = () => {
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
              <th>Email</th>
              <th>Name</th>
              <th>Room type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>No.Geusts</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
        
                <>
                  <td>1QEDERE7DHG</td>
                  <td>MOLOBE@GMAIL.COM</td>
                  <td>Molobe</td>
                  <td>SINGLE</td>
                  <td>12-JAN-2022</td>
                  <td>23-JAN-2022</td>
                  <td>2</td>
                  <td>R 5482</td>
                  <StatusTD type='Pending'>pending</StatusTD>
                 
                
                </>
                <tr>
                  <td>1QEDERE7DHG</td>
                  <td>MOLOBE@GMAIL.COM</td>
                  <td>Molobe</td>
                  <td>SINGLE</td>
                  <td>12-JAN-2022</td>
                  <td>23-JAN-2022</td>
                  <td>2</td>
                  <td>R 5482</td>
                  <StatusTD type='Cancelled'>Cancelled</StatusTD>
                 
                
                </tr>
                <tr>
                  <td>1QEDERE7DHG</td>
                  <td>MOLOBE@GMAIL.COM</td>
                  <td>Molobe</td>
                  <td>SINGLE</td>
                  <td>12-JAN-2022</td>
                  <td>23-JAN-2022</td>
                  <td>2</td>
                  <td>R 5482</td>
                  <StatusTD type='Completed'>Completed</StatusTD>
                 
                
                </tr>
              
           
          </tbody>
        </Table>
        </div>
    )
}
