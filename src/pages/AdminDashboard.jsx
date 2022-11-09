import React, { Component } from 'react';
import { Button, Container } from '@material-ui/core';
import ShowRoomTable from '../components/ShowRoomTable';
import ShowBookingTable from '../components/ShowBookingTable';
import ShowCheckoutTable from '../components/ShowCheckoutTable';
import {AuthConsumer} from '../hooks/AuthContext';

class AdminPage extends Component {
  render() {
    return (
      <> 
        <Container>
          <h3 align="center">Dashboard</h3>
          
            <AuthConsumer>
              {props =>{
                const {AdminUsername, IsAuthenticated, LogIn, LogOut, AuthData} = props; 
                return (
                  <>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center' }}>
                      <h3>Hey {AuthData.adminUsername},</h3>
                      {/* <p>{console.log(authContext)}</p> */}
                      <Button align="right" onClick={LogOut}>Log out</Button>
                    </div>
                    </>
                    )
                  }
                }
              </AuthConsumer>

            <div>
            <ShowRoomTable/>
            <br/><br/>
            <ShowBookingTable/>
            <br/><br/>
            <ShowCheckoutTable/>
            <br/><br/>
          </div>
        </Container>
      
      </>
    )
  }
}

export default AdminPage;