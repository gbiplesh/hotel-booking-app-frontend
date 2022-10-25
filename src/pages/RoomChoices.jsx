import { Container } from '@material-ui/core';
import React, { useContext } from 'react';
import ChoiceCard from '../components/ChoiceCard';
import useStateContext, { stateContext } from '../hooks/useStateContext';

const RoomChoices = () => {

  return ( 
    <>
      <Container>
        <h3>Choose your rooms</h3>

        <ChoiceCard />
        
      </Container>
    </>
   );
}
 
export default RoomChoices;