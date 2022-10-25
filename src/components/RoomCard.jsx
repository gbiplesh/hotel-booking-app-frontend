import React, { Component } from 'react';
import { Button, CardActions, CardContent, Paper } from '@material-ui/core';
import useStateContext from '../hooks/useStateContext';
import './../css/roomCard.scss';  


const RoomCard = (props) => {

  const { context, setContext } = useStateContext();
   
    return ( 
      <>

        <Paper 
          square 
          elevation={3} 
          variant="outlined" 
          className="card">
            <CardContent>
              <p>{props.type}</p>
              <img src="https://www.tareemotorinn.com.au/content/room/full/Deluxe_King_Room___Taree_Motor_Inn-67-16.jpg"
                    alt="alt" 
                    className="card-image" />
              <p>${props.price} per day</p>
            </CardContent>
            <CardActions>
              <a href="/room-detail" style={{textDecoration: "none"}}>
                <Button size="small" variant="outlined" className="card-button" onClick={() => setContext({ roomType: props.type, price: props.price, available: props.available, people: props.people })}>
                  Book
                </Button>
              </a>
            </CardActions>
        </Paper>
      
      </> 
    );

}
 
export default RoomCard;