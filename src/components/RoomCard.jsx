import React, { Component } from 'react';
import { Button, CardActions, CardContent, Container, Paper } from '@material-ui/core';
import useStateContext from '../hooks/useStateContext';
import './../css/roomCard.scss';  
import { variables } from '../api/Variables';
import ImageModal from './ImageModal';


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
              <Container>
                <p>{props.type}</p>
                <ImageModal
                  image={props.image}
                  element={
                    <img src={variables.APP_IMAGEPATH + props.image}
                    alt={props.image} 
                    className="card-image"
                    style={{objectFit:'contain', width: 'inherit', height: 'auto'}} 
                    />
                  }
                  />
                <p>${props.price} per day</p>
              </Container>
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