import React, {Component} from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, Button } from '@material-ui/core';
import {Delete, Edit} from '@material-ui/icons';
import { variables } from '../api/Variables';
import BookingModal from "./BookingModal";
import "./../css/showTables.scss";


class ShowBookingTable extends Component {
  
  constructor(props){
    super(props);

    this.state={
      bookings:[],
    }
  }

  //Method to resfresh the Room data from the Get API method
  refreshList(){
    fetch(variables.API_URL+'api/bookings')
    .then(response=>response.json())
    .then(data=>{
      this.setState({bookings:data});
    });
  }

  componentDidMount(){
      this.refreshList();
  }

  deleteBooking(id){ 
    if(window.confirm('Do you want to delete this data permanently?')){
    fetch(variables.API_URL+'api/bookings/'+id,{
      method:'DELETE',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      }
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })}
    window.location.reload();

  }
  
  // Edit Existing Bookings
  triggerEditBooking(id, roomType, fullName, roomQuantity, checkIn, checkOut, price){
    
    fetch(variables.API_URL+'api/bookings',{
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "Id": id, 
        "RoomType": roomType,
        "FullName": fullName,
        "RoomQuantity": roomQuantity,
        "CheckIn": checkIn,
        "CheckOut": checkOut,
        "Price": price,
      })
      })
      .then(res=>res.json())
      .then((result)=>{
        this.refreshList();
      },(error)=>{
        alert('Failed');
      })
      alert('Booking Data Updated!');
      window.location.reload();
  }

  // Add new Bookings
  triggerAddBooking(id, roomType, fullName, roomQuantity, checkIn, checkOut, price) {

    console.log(id, roomType, fullName, roomQuantity, checkIn, checkOut, price);
    
    fetch(variables.API_URL+'api/bookings',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "RoomType": roomType,
        "FullName": fullName,
        "RoomQuantity": roomQuantity,
        "CheckIn": checkIn,
        "CheckOut": checkOut,
        "Price": price,
      })
      })
      .then(res=>res.json())
      .then((result)=>{
        this.refreshList();
      },(error)=>{
        alert('Failed');
      })
      alert('Booking Data Added!');
      window.location.reload();
}  

  render() {
    
    const{bookings} = this.state;

    return (
      <>
        <Container>
          <div className="above-table">
            <h4>Bookings List:</h4>
            <BookingModal 
              icon="Add Booking" 
              modalButtonText="Add" 
              bookingId="Id will be automated."
              buttonOnClick={this.triggerAddBooking.bind(this)}
              />
          </div>
          
          <TableContainer component={Paper} className="table-header">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-row">
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Full Name</TableCell> 
                  <TableCell align="center">Room Type</TableCell>
                  <TableCell align="center">No. of Rooms</TableCell>
                  <TableCell align="center">Check-In Date</TableCell>
                  <TableCell align="center">Check-Out Date</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                      {
                        bookings.map(booking => (
                          <TableRow
                          key={booking.Id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                          <TableCell align="center">{booking.Id}</TableCell>
                          <TableCell align="center">{booking.FullName}</TableCell>
                          <TableCell align="center">{booking.RoomType}</TableCell>
                          <TableCell align="center">{booking.RoomQuantity}</TableCell>
                          <TableCell align="center">{booking.CheckIn}</TableCell>
                          <TableCell align="center">{booking.CheckOut}</TableCell>
                          <TableCell align="center">{booking.Price}</TableCell>
                          <TableCell align="center" className="icons-cell">
                            <span><BookingModal 
                                    icon={<Edit/>} 
                                    modalButtonText="Edit" 
                                    buttonOnClick={this.triggerEditBooking.bind(this)} 
                                    bookingId={booking.Id} 
                                    roomType={booking.RoomType} 
                                    fullName={booking.FullName}
                                    roomQuantity={booking.RoomQuantity}
                                    checkIn={booking.CheckIn}
                                    checkOut={booking.CheckOut}
                                    price={booking.Price} 
                                    /></span>
                            <span><Button variant="outlined" onClick={() => this.deleteBooking(booking.Id)}><Delete/></Button></span>
                          </TableCell>
                        </TableRow>
                      ))
                    }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </>
    )
  }
}

export default ShowBookingTable; 