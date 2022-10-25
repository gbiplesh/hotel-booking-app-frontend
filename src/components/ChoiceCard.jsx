import React, {useState, useContext } from 'react';
import { Button, CardContent, CardActions, Chip, Grid, Paper, TextField, MenuItem } from '@material-ui/core';
import "./../css/choiceCard.scss";
import { Bedside, People } from "./../assets/index";
import useStateContext, {stateContext} from '../hooks/useStateContext';

const ChoiceCard = () => {

  
  
  const [Rooms, setRooms] = useState(0);
  const { context, setContext } = useStateContext();
  
  const handleChange = (event) => {
    setRooms(event.target.value);
    setContext({ roomQuantity: event.target.value });
  };

  const handleCheckIn = e => {
    console.log(e.target.value);
    setContext({ checkIn: e.target.value })
  }

  const handleCheckOut = e => {
    console.log(e.target.value);
    setContext({ checkOut: e.target.value })
  }

  return ( 
    <>
      <Paper
        square 
        elevation={3} 
        variant="outlined"
        className="choice-card" 
      >
        <form action="/checkout">
            <div style={{padding: "20px"}}>
              <div>
                <p className="choice-title">{context.roomType} Room</p>
                <span className='label'>{context.available} rooms left</span>
              </div>
              <div className='card-grid-container'>
                <div className="flex-container">
                  <div className="card-grid-item" style={{padding: '15px'}}>
                    <span>Guests : </span>
                    <span style={{fontWeight:"700"}}>2 x</span>
                    <img src={People} alt="alt" className="avatar" /><br/>
                    
                    <span>Price: </span>
                    <span>${context.price} per day</span>
                  </div>
                  <div className="card-grid-item">
                      <TextField
                        id="room-quantity"
                        name="roomQuantity"
                        select
                        label="Rooms"
                        value={Rooms}
                        onChange={handleChange}
                        helperText="Please select your room numbers"
                      >
                          <MenuItem key={1} value={1}>
                            1
                          </MenuItem>
                          <MenuItem key={1} value={2}>
                            2
                          </MenuItem>
                          <MenuItem key={1} value={3}>
                            3
                          </MenuItem>
                      </TextField>
                  </div>
                </div>
                <div className="flex-container">
                    <div className="card-grid-item">
                      <TextField 
                        id="check-in"
                        name="checkIn"
                        type="date" 
                        label="Check In" 
                        InputLabelProps={{ shrink: true, }}
                        onChange={handleCheckIn}
                        /><br/><br/>
                    </div>
                    <div className="card-grid-item">
                      <TextField 
                      id="check-out" 
                      name="checkOut"
                      type="date" 
                      label="Check Out" 
                      InputLabelProps={{ shrink: true, }}
                      onChange={handleCheckOut}
                    />
                    </div>
                </div>
                <div className="card-grid-item">
                  <img src={Bedside} alt="alt" style={{opacity: 0.5}} />
                </div>
              </div>
            </div>
            <div style={{margin: '5vh 0vh', display: "flex", padding: "8px", alignItems: "center" }}>
              <div style={{textDecoration: "none", margin:"auto"}} >
                <Button type="submit" size="small" variant="outlined" >
                  Book
                </Button>
              </div>
            </div>
        </form>
      </Paper>
    </>
   );
}
 
export default ChoiceCard;