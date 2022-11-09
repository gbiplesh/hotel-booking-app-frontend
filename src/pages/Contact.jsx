import { Container } from '@material-ui/core';
import React from 'react';
import {Email, Phone, QuestionAnswer, Room, SupervisorAccount} from '@material-ui/icons';

const Contact = () => {
  return ( 
    <>
      <Container>
        <h3>Contact Us</h3> 
          <p><span style={{ verticalAlign: "middle" }}><Phone/></span> &nbsp; 03 1234 1234</p>
          <p><span style={{ verticalAlign: "middle" }}><Room/></span> &nbsp; Marion Rd, Marion, SA 5000</p>
          <p><span style={{ verticalAlign: "middle" }}><Email/></span> &nbsp; info@thegreatrandomhotel.com.au</p>
          <p><span style={{ verticalAlign: "middle" }}><QuestionAnswer/></span> &nbsp; Read traveler reviews on TripAdvisor</p>
          <p><span style={{ verticalAlign: "middle" }}><SupervisorAccount/></span> &nbsp; <a href="https://gbiplesh.github.io/portfolio/">Biplesh B K</a></p>
      </Container>
    
    </>
  );
}
 
export default Contact;