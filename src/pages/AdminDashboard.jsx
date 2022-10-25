import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import ShowRoomTable from '../components/ShowRoomTable';
import ShowBookingTable from '../components/ShowBookingTable';
import ShowCheckoutTable from '../components/ShowCheckoutTable';

class AdminPage extends Component {
  render() {
    return (
      <> 
        <Container>
          <h3>Admin Dashboard</h3>
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