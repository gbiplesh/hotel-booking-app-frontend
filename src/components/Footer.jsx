import { Email, Facebook, Instagram } from '@material-ui/icons';
import React from 'react';

const Footer = () => {
  return ( 
    <>
      <p style={{ margin: '60px', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Facebook/> &nbsp; &nbsp; <Instagram/> &nbsp; &nbsp; <Email/>
      </p>
    </> 
    
  );
}
 
export default Footer;