import React from 'react';
import {Button} from "@material-ui/core";
import {Bed} from "./../assets/index";
import {Container} from "@material-ui/core";
import { Link } from 'react-router-dom';


const Home = () => {

  function divHover(e) {
    document.getElementById("hidden-div").style.opacity = "1";
    var elements = document.getElementsByClassName("book-button");
    var buttonText = document.getElementById("button-text");
    elements[0].style.color = "#EAE7DC";
    elements[0].style.borderColor = "#EAE7DC";
    buttonText.style.color = "#EAE7DC";
  }

  function divDefault(e) {
    document.getElementById("hidden-div").style.opacity = "0";
    var elements = document.getElementsByClassName("book-button");
    var buttonText = document.getElementById("button-text");
    elements[0].style.color = "#8e8d8a";
    elements[0].style.borderColor = "#8e8d8a";
    buttonText.style.color = "#8e8d8a";
  }

  return ( 
    <>
      <div style={{position: 'relative'}} >
        <Container className="top" style={{ position: 'relative'}} onMouseEnter={divHover} onMouseLeave={divDefault}>
          <div>
          <img src={Bed} alt="rve" className="banner" />
          <Button className="book-button" variant="outlined" size="large">
            <Link exact to="/rooms">
              <h3 id="button-text">Book Now!</h3>
            </Link>
          </Button>
            <div id="hidden-div" className="fade-animate">
            <p>Comfortable Stay & Friendly Staffs. <br/> 
              Make a reservation today.</p>
          </div>
          </div>
        </Container>
      </div>

    </>
   );
}
export default Home;