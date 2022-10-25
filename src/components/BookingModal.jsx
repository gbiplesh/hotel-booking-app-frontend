import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function BookingModal(props) {

  const classes = useStyles();
  const [RoomType, setRoomType] = useState(props.roomType);
  const [FullName, setFullName] = useState(props.fullName);
  const [RoomQuantity, setRoomQuantity] = useState(props.roomQuantity);
  const [CheckIn, setCheckIn] = useState(props.checkIn);
  const [CheckOut, setCheckOut] = useState(props.checkOut);
  const [Price, setPrice] = useState(props.price);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant="outlined" type="button" onClick={() => setOpen(true)}>
        {props.icon}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form autoComplete="off">
              <div className="flex-container">
                <TextField label="Id" name="id" value={props.bookingId} disabled/><br/><br/>
                <TextField required label="Room Type" name="roomType" placeholder={RoomType} onChange={(e) => setRoomType(e.target.value)}/><br/><br/>
                <TextField required label="Full Name" name="fullName" placeholder={FullName} onChange={(e) => setFullName(e.target.value)}/><br/><br/>
                <TextField required label="RoomQuantity" name="roomQuantity" placeholder={RoomQuantity} onChange={(e) => setRoomQuantity(e.target.value)}/><br/><br/>
                <TextField required label="Check-In Date" name="checkInDate" type='date' InputLabelProps={{ shrink: true, }} placeholder={CheckIn} onChange={(e) => setCheckIn(e.target.value)}/><br/><br/>
                <TextField required label="Check-Out Date" name="checkOutDate" type='date' InputLabelProps={{ shrink: true, }} placeholder={CheckOut} onChange={(e) => setCheckOut(e.target.value)}/><br/><br/>
                <TextField required label="Price" name="price" placeholder={Price} onChange={(e) => setPrice(e.target.value)}/><br/><br/>
                <Button onClick={() => props.buttonOnClick(props.bookingId, RoomType, FullName, RoomQuantity, CheckIn, CheckOut, Price)} variant="outlined" color="secondary">
                  {props.modalButtonText}
                </Button><br/>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
