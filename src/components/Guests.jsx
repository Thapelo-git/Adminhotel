import React from 'react'
import {Table} from "react-bootstrap";
function Guests() {
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
              <th>Phone No.</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
        
                <>
                  <td>1QEDERE7DHG</td>
                  <td>MOLOBE@GMAIL.COM</td>
                  <td>Molobe</td>
                  <td>0745125925</td>
                  <td></td>
                  
                 
                 
                
                </>
                <tr>
                  <td>1QEDERE7DHG</td>
                  <td>MOLOBE@GMAIL.COM</td>
                  <td>Molobe</td>
                  <td>08512364</td>
                  <td></td>
                  
                  
                 
                
                </tr>
                <tr>
                  <td>1QEDERE7DHG</td>
                  <td>MOLOBE@GMAIL.COM</td>
                  <td>Molobe</td>
                  <td>0896512123</td>
                  <td></td>
                  
                
                 
                
                </tr>
              
           
          </tbody>
          
        </Table>
        </div>
    )
}

export default Guests
