import React, {Component, useState} from 'react';
import './../css/rooms.scss'
import { Container } from '@material-ui/core';
import RoomCard from '../components/RoomCard';
import roomData  from "../json/roomType";
import { variables } from '../api/Variables';
import { response } from 'har-validator';




class Rooms extends Component {

  constructor(props){
    super(props);

    this.state={
      rooms:[]
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

  render(){
     
    const{rooms} = this.state;

    return ( 
      <>
        <Container>
          <h2 className="sub-heading">Rooms we offer</h2><br/>
          <div className="grid">
            {
              rooms.map(room => (
                <RoomCard type={room.RoomType} price={room.Price} id={room.Id} available={room.Available} people={room.Beds} />
              ))
            }
          </div>
        </Container>
      </>
      );
    }
}
 
export default Rooms;