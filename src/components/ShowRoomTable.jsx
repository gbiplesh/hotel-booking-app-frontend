import React, {Component} from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, Button } from '@material-ui/core';
import {Delete, Edit} from '@material-ui/icons';
import { variables } from '../api/Variables';
import RoomModal from "./RoomModal";
import "./../css/showTables.scss";
import ImageModal from './ImageModal';


class ShowRoomTable extends Component {
  
  constructor(props){
    super(props);

    this.state={
      rooms:[],
    }
  }

  photoFileName = "random.png";
  imagesrc = variables.APP_IMAGEPATH + this.photoFileName;

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
  
  triggerEditRoom(id, roomType, image, price, people, available){
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
        "Image": image,
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
  
  handleImageUpload(e) {
    // e.preventDefault();
    this.photoFileName = e.target.files[0].name; 
    console.log(this.photoFileName);
    const formData = new FormData();
    formData.append(
      "myFile",
      e.target.files[0],
      e.target.files[0].name
    );

    fetch(variables.API_URL+ 'api/rooms/savefile',{
      method: 'POST',
      body: formData
    })
    .then(res=>res.json())
    .then((result)=>{
      this.imagesrc = variables.APP_IMAGEPATH + result;
    },
    (error)=>{
      alert('Failed');
    })
  }

  triggerAddRoom(id, roomType, image, price, people, available) {
    
    // this.handleImageUpload(image);
  
    fetch(variables.API_URL+'api/rooms',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        // "Id": id, 
        "RoomType": roomType,
        "Image": image,
        "Price": price,
        "Beds": people, // beds is the name of the column in database which means the number of people that can fit in a room. 
        "Available": available,
      })
      })
      .then(res=>res.json())
      .then((result)=>{
        // this.refreshList();
        // alert(result);
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
              image = {this.imagesrc}
              buttonOnClick={this.triggerAddRoom.bind(this)}
              onUpload={this.handleImageUpload.bind(this)}
              />
          </div>
          
          <TableContainer component={Paper} className="table-header">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-row">
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Room Type</TableCell>
                  <TableCell align="center">Image</TableCell>
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
                          <TableCell align="center">
                            <ImageModal 
                            image={room.Image}
                            element={
                              <span>{room.Image}</span>
                            }
                            />
                            </TableCell>
                          <TableCell align="center">{room.Beds}</TableCell>
                          <TableCell align="center">{room.Available}</TableCell>
                          <TableCell align="center">{room.Price}</TableCell>
                          <TableCell align="center" className="icons-cell">
                            <span><RoomModal 
                                    icon={<Edit/>} 
                                    room={room}
                                    modalButtonText="Edit" 
                                    buttonOnClick={this.triggerEditRoom.bind(this)} 
                                    onUpload={this.handleImageUpload.bind(this)}
                                    roomId={room.Id} 
                                    roomType={room.RoomType} 
                                    image={room.Image} 
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