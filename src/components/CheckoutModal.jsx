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

export default function CheckoutModal(props) {

  const classes = useStyles();
  const [FirstName, setFirstName] = useState(props.firstName);
  const [LastName, setLastName] = useState(props.lastName);
  const [Email, setEmail] = useState(props.email);
  const [Phone, setPhone] = useState(props.phone);
  const [Dob, setDob] = useState(props.dob);
  const [Verify, setVerify] = useState(props.verify);
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
                <TextField label="Id" name="id" value={props.checkoutId} disabled/><br/><br/>
                <TextField required label="First Name" name="firstName" placeholder={FirstName} onChange={(e) => setFirstName(e.target.value)}/><br/><br/>
                <TextField required label="Last Name" name="lastName" placeholder={LastName} onChange={(e) => setLastName(e.target.value)}/><br/><br/>
                <TextField required label="Email" name="email" placeholder={Email} onChange={(e) => setEmail(e.target.value)}/><br/><br/>
                <TextField required label="Phone" name="phone" placeholder={Phone} onChange={(e) => setPhone(e.target.value)}/><br/><br/>
                <TextField required label="Date of Birth" name="dob" type='date' InputLabelProps={{ shrink: true, }} placeholder={Dob} onChange={(e) => setDob(e.target.value)}/><br/><br/>
                <TextField required label="Verification ID" name="verify" placeholder={Verify} onChange={(e) => setVerify(e.target.value)}/><br/><br/>
                <Button onClick={() => props.buttonOnClick(props.checkoutId, FirstName, LastName, Email, Phone, Dob, Verify)} variant="outlined" color="secondary">
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
