import React, {Component, createRef, useState} from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, Modal, Button } from '@material-ui/core';
import {Delete, Edit} from '@material-ui/icons';
import { variables } from '../api/Variables';
import RoomModal from "./RoomModal";
import "./../css/showTables.scss";


class ShowRoomTable extends Component {
  
  constructor(props){
    super(props);

    this.state={
      rooms:[],
    }
  }

  //Method to resfresh the Room data from the Get API method
  refreshList(){
    fetch(variables.API_URL+'api/rooms')
    .then(response=>response.json())
    .then(data=>{
      this.setState({rooms:data});
    });
  }

  componentDidMount(){
      this.refreshList();
  }

  deleteRoom(id){ 
    if(window.confirm('Do you want to delete this data permanently?')){
    fetch(variables.API_URL+'api/rooms/'+id,{
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
  
  triggerEditRoom(id, roomType, price, people, available){
    // e.preventDefault();
    // props.setOpen(false);
    
    fetch(variables.API_URL+'api/rooms',{
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "Id": id, 
        "RoomType": roomType,
        "Price": price,
        "Beds": people, // beds is the name of the column in database which means the number of people that can fit in a room. 
        "Available": available,
      })
      })
      .then(res=>res.json())
      .then((result)=>{
        this.refreshList();
      },(error)=>{
        alert('Failed');
      })
      alert('Room Data Updated!');
      window.location.reload();
  }

  triggerAddRoom(id, roomType, price, people, available) {
    
    console.log(id, roomType, price, people, available);
  
    fetch(variables.API_URL+'api/rooms',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        // "Id": id, 
        "RoomType": roomType,
        "Price": price,
        "Beds": people, // beds is the name of the column in database which means the number of people that can fit in a room. 
        "Available": available,
      })
      })
      .then(res=>res.json())
      .then((result)=>{
        this.refreshList();
      },(error)=>{
        alert('Failed');
      })
      alert('Room Data Added!');
      window.location.reload();
}  

  render() {
    
    const{rooms} = this.state;

    return (
      <>
        <Container>
          <div className="above-table">
            <h4>Rooms List:</h4>
            <RoomModal 
              icon="Add Room" 
              modalButtonText="Add" 
              roomId="Id will be automated."
              buttonOnClick={this.triggerAddRoom.bind(this)}
              />
          </div>
          
          <TableContainer component={Paper} className="table-header">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-row">
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Room Type</TableCell>
                  <TableCell align="center">People</TableCell>
                  <TableCell align="center">Available</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                      {
                        rooms.map(room => (
                          <TableRow
                          key={room.Id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                          <TableCell align="center">{room.Id}</TableCell>
                          <TableCell align="center">{room.RoomType}</TableCell>
                          <TableCell align="center">{room.Beds}</TableCell>
                          <TableCell align="center">{room.Available}</TableCell>
                          <TableCell align="center">{room.Price}</TableCell>
                          <TableCell align="center" className="icons-cell">
                            <span><RoomModal 
                                    icon={<Edit/>} 
                                    room={room}
                                    modalButtonText="Edit" 
                                    buttonOnClick={this.triggerEditRoom.bind(this)} 
                                    roomId={room.Id} 
                                    roomType={room.RoomType} 
                                    people={room.Beds} 
                                    available={room.Available} 
                                    price={room.Price} 
                                    /></span>
                            <span><Button variant="outlined" onClick={() => this.deleteRoom(room.Id)}><Delete/></Button></span>
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

export default ShowRoomTable; 