import React from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import { AC, Bedroom, Cup, Heater, TV, Wifi, People } from "./../assets/index";
import "./../css/roomDetail.scss";
import useStateContext from '../hooks/useStateContext';


const RoomDetail = () => {
  
  const { context, setContext } = useStateContext();


  return ( 
    <>
      <Container>
        <Grid container justify="flex-start" spacing={2} xs={12}>

          <Grid key={1} item xs={8}>   
            <h2>{context.roomType} Room</h2>
            <img src={Bedroom} alt="alt" width="50%" style={{ opacity : 0.7, padding: "0vh 24%" }} />

            <h3>Description</h3>
            <p> 
                Large ground floor room with comfortable bed with pillow top mattress and sofa.
                Glass sliding door opens to your private balcony offering breathtaking views of the Random River and Random Bridge.
                White Linen and fluffy white towels are provided with this room.
            </p>
          </Grid>
          
          <Grid key={1} item xs={4}>
            <div><h3>Features</h3></div>
            <div className="room-grid">
              <div>
                <img src={AC} alt="alt" />
              </div>
              <div>
                <img src={Cup} alt="alt" />
              </div>
              <div>
                <img src={Heater} alt="alt" />
              </div>
              <div>
                <img src={TV} alt="alt" />
              </div>
              <div>
                <img src={Wifi} alt="alt" />
              </div>
              <div>
                <span style={{fontWeight:"700"}}> {context.people} x</span>
                <img src={People} alt="alt" />
              </div>
            </div>
            <div>
              <h3>Book Your Room</h3>
              <form autoComplete="off" >
                  <a href="/room-choices" style={{textDecoration: "none"}}>
                    <Button 
                    variant="outlined" 
                    className="button-style"
                    >
                      Book
                    </Button>
                  </a>
              </form>
            </div>
          </Grid>

        </Grid>
      </Container>
    </>
   );
}
 
export default RoomDetail;