import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, Button } from '@material-ui/core';
import { variables } from '../api/Variables';



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

export default function RoomModal(props) {

  const classes = useStyles();
  const [RoomType, setRoomType] = useState(props.roomType);
  const [Image, setImage] = useState(props.image);
  const [People, setPeople] = useState(props.people);
  const [Available, setAvailable] = useState(props.available);
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
                <TextField label="Id" name="id" value={props.roomId} disabled/><br/><br/>
                <TextField required label="Room Type" name="roomType" placeholder={RoomType} onChange={(e) => setRoomType(e.target.value)}/><br/><br/>
                <img width='200px' height='200px' style={{objectFit:'contain'}} src={variables.APP_IMAGEPATH + Image} alt={Image} /> <br/>
                <TextField required name="image" placeholder={Image} type="file" onChange={(e) => {props.onUpload(e); setImage(e.target.files[0].name) }}/><br/><br/>
                <TextField required label="People" name="people" placeholder={People} onChange={(e) => setPeople(e.target.value)}/><br/><br/>
                <TextField required label="Available" name="available" placeholder={Available} onChange={(e) => setAvailable(e.target.value)}/><br/><br/>
                <TextField required label="Price" name="price" placeholder={Price} onChange={(e) => setPrice(e.target.value)}/><br/><br/>
                <Button onClick={() => props.buttonOnClick(props.roomId, RoomType, Image, Price, People, Available)} variant="outlined" color="secondary">
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
