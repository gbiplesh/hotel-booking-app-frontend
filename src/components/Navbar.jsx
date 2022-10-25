import React from 'react'
import { Tab, Tabs, withStyles  } from "@material-ui/core";
import { NavLink } from 'react-router-dom';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
  flexContainer: {
    float: 'right',
  },
})((props) => <Tabs {...props}/>);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#8E8D8A',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);


const NavBar = () => {

  return ( 
    <>
      <div className="navbar">
        <StyledTabs>
          <NavLink 
          activeClassName="active-nav"
          exact 
          to="/" 
          >
            <StyledTab label="Home"/>
          </NavLink>

          <NavLink
          activeClassName="active-nav"
          exact
          to="/rooms"  
          >
            <StyledTab label="Lodgings"/>
          </NavLink>
          
          
          <NavLink
          activeClassName="active-nav"
          exact
          to="/about"           
          >
            <StyledTab label="About" />
          </NavLink>

          
          <NavLink
          activeClassName="active-nav"
          exact
          to="/contact"           
          >
            <StyledTab label="Contact" />
          </NavLink>

          <NavLink
          activeClassName="active-nav"
          exact
          to="/admin"           
          >
            <StyledTab label="Admin" />
          </NavLink>
        </StyledTabs>
      </div>
    </>
   );
}
 
export default NavBar;