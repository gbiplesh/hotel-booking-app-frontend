import React, {useState } from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import "./../css/choiceCard.scss";
import { Bedside, People } from "./../assets/index";
import useStateContext from '../hooks/useStateContext';

const ChoiceCard = () => {

  
  
  const [Rooms, setRooms] = useState(0);
  const [CheckIn, setCheckIn] = useState('');
  const { context, setContext } = useStateContext();
  
  const handleRoomSelect = (event) => {
    if(event.target.value <= context.available && event.target.value > 0 ){
      setRooms(event.target.value);
      setContext({ roomQuantity: event.target.value });
    }else{
      alert('Invalid Room Amount! Only ' + context.available + ' rooms available.' )
    }
  };

  function checkDate(giveDate) {
    var q = new Date();
    var m = q.getMonth();
    var d = q.getDay();
    var y = q.getFullYear();

    var todayDate = new Date(y,m,d);
    var givenDate=new Date(giveDate);

    if(todayDate < givenDate)
    {
      return true;
    }
    else
    {
      return false; 
    }
  }

  const handleCheckIn = e => {
    // if(e.target.value <= Date.now() )
    if(checkDate(e.target.value) === true ){
      setContext({ checkIn: e.target.value })
      setCheckIn((e.target.value));
    } else {
      alert("Invalid Date! Please enter a date from tomorrow.");
    }

  }

  const handleCheckOut = e => {
    if(checkDate(e.target.value) === false ){
      alert("Invalid Date! Please enter a date from tomorrow.");
    } else if (new Date(e.target.value) < new Date(CheckIn)) {
      alert("Invalid Date! Please enter a date after Check-In Date.");
    } else {
      setContext({ checkOut: e.target.value });
    }
  }

  const handleSubmit = e => {
    if(Rooms == null){
      alert('Enter room amount, please!')
    }else{
      window.location.assign("/checkout");
    }
  }

  return ( 
    <>
      <Paper
        square 
        elevation={3} 
        variant="outlined"
        className="choice-card" 
      >
        <form action="/checkout" onSubmit={handleSubmit}>
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
                        label="Rooms"
                        onChange={handleRoomSelect}
                        helperText="Please select your room numbers"
                      />
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