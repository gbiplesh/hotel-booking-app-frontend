import React, { Component, useState } from 'react';
import { Container, Paper } from '@material-ui/core';
import useStateContext, { stateContext } from '../hooks/useStateContext';
import { variables } from '../api/Variables';
import { useLocation} from "react-router-dom";


const Booked = () =>  {
  const { context, setContext } = useStateContext();

      return ( 
        <>
          <Container>
            <h3>Booked!</h3>
            <Paper>
              <div style={{padding: "100px"}}>
                <h3>Your booking is successful. Welcome abroad, {context.firstName}.  </h3>
              </div>
            </Paper>

          </Container>

        
        </>
      );
    
}
 
export default Booked;