import React, {useState, useRef} from 'react';
import { Checkbox,Container, FormControl, Grid, Paper, TextField } from "@material-ui/core";
import "./../css/checkout.scss";
import useStateContext from '../hooks/useStateContext';
import Moment from "react-moment";
import { variables } from '../api/Variables';


const Checkout = () => {
  
  const { context, setContext } = useStateContext();

  const checkInDate = context.checkIn;
  const checkOutDate = context.checkOut;
  const price = context.price;
  const available = context.available;

  function priceTotal(rate, count) {
    let result = rate * count;
    return result ;
  }

  const formRef = useRef();
  
  function submitCheckout(){
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    setContext({firstName: data.firstName});

    // POST API to upload data in checkout table 
    fetch(variables.API_URL+'api/checkouts',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "FirstName": data.firstName,
        "LastName": data.lastName,
        "Email": data.email,
        "Phone": data.phone,
        "DOB": data.dob,
        "VerificationID": data.verificationId  
      })
      })
      .then(res=>res.json())
      .then((result)=>{
          this.refreshList();
      },(error)=>{
          alert('Failed');
      })

      // POST API to upload data in bookings table
      fetch(variables.API_URL+'api/bookings',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "RoomType": context.roomType,
        "FullName": data.firstName + " "+ data.lastName,
        "RoomQuantity": context.roomQuantity,
        "CheckIn": context.checkIn,
        "CheckOut": context.checkOut,
        "Price": context.price 
      })
      })
      .then(res=>res.json())
      .then((result)=>{
          this.refreshList();
      },(error)=>{
          alert('Failed');
      })


  }



  return ( 
    <>
      <Container>
        <h3>Checkout</h3>
        <form action="/booked" method="get" autoComplete="off" ref={formRef} >

        <Paper className="papers">
          <Grid container justify="flex-start" spacing={2} xs={12}>
            <Grid key={1} item xs={7}>

              <p className="headings">Contact Details</p>

                <FormControl component="div" fullWidth>
                  <div className="flex-container">
                    <TextField required id="first-name" label="First Name" name="firstName"/>
                    <TextField required id="last-name" label="Last Name" name="lastName" />
                  </div>
                  <div className="flex-container">
                    <TextField id="email" label="Email" name="email"/>
                    <TextField required id="phone" label="Phone" name="phone"/>
                  </div>
                  <div className="flex-container">
                    <TextField 
                      id="dob"
                      name="dob"
                      type="date" 
                      label="Date of Birth" 
                      InputLabelProps={{ shrink: true, }}
                      style={{minWidth: "29vh"}}
                      />
                    <TextField required id="verificationId" label="License ID/Photo ID" name="verificationId"/>
                  </div>
                </FormControl>


            </Grid>

            <Grid item xs={1}>
             <div className="line"></div>
            </Grid>

            <Grid key={1} item xs={4}>
            <div>
              <h3>Your Bookings:</h3>
              

              <table style={{width: "100%"}} className="room-details">
                <tr>
                  <td><b>Selected Rooms</b></td>
                  <td>{context.roomType} Room</td>
                </tr>
                <tr>
                  <td><b>Arrival Date</b></td>
                  <td>{context.checkIn}</td>
                </tr>
                <tr>
                  <td><b>Departure Date</b></td>
                  <td>{context.checkOut}</td>
                </tr>
                <tr>
                  <td><b>Days Staying</b></td>
                  <td><Moment duration={checkInDate}
                    date= {checkOutDate}
                    />
                  </td>
                </tr>
              </table>
              <hr />

              <table style={{width: "100%"}}>
                <tr>
                  <td>Room rate:</td>
                  <td>${price}.00</td>
                </tr>
                <tr>
                  <td>GST:</td>
                  <td>$ {(priceTotal(price, available) * 0.0909).toFixed(2) }</td>
                </tr>
                <td>Total</td>
                <td>$ {priceTotal(price, available)}</td>
              </table>


            </div>
            </Grid>
          </Grid>
        </Paper>

        <div>
          <Checkbox
            required
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <span>I agree with the terms and conditions of The Great Hotel Random.</span>

          <button id="finish" variant="outlined" style={{float:'right'}} color="secondary" onClick={submitCheckout}>
            Finish your bookings
          </button>
        </div>

        </form>

      </Container>
    </>
   );
}
 
export default Checkout;