import { FormControl, TextField, Button, Container } from '@material-ui/core';
import React, { Component } from 'react';
import "./../css/admin.scss";
import { variables } from '../api/Variables';


class Admin extends Component {
  
  constructor(props){
    super(props);

    this.state={
      login:[],
    }
  }
  
  //Method to resfresh the Room data from the Get API method
  // refreshList(){
  //   fetch(variables.API_URL+'api/login')
  //   .then(response=>response.json())
  //   .then(data=>{
  //     this.setState({login:data});
  //     console.log(this.state.login);
  //   });
  // }
  // componentDidMount(){
  //     this.refreshList();
  // }

  triggerLogin(username, password) {
    
    console.log(username, password);
  
    fetch(variables.API_URL+'api/login',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "Username": username, 
        "Password": password, 
      })
      })
      .then(res=>{
        res.json();
        console.log(res);
      })
      .then((result)=>{
        // this.refreshList();
        // console.log(result);
      },(error)=>{
        alert('Failed');
      })
      alert('Login Successfull!');
      // window.location.reload();
      // history.push("/admin/dashboard");
}  





  render() {
    return(
      <>
        <Container>
          <h3>Admin Login</h3>
          <div className='sign-in'>
            <form autoComplete="off" >
              <FormControl component="div" fullWidth>
                <div className="flex-container">
                  <TextField required label="Username" name="username"/><br/>
                  <TextField required label="Password" name="password" type='password' /><br/><br/>
                  <Button variant="outlined" color="secondary" onClick={(e) => this.triggerLogin("john_admin", "myPass_word123")}>
                    Sign-In
                  </Button><br/>
                  <span></span>
                </div>
                </FormControl>
            </form>
          </div>
        </Container>
      </>
      )
  }

}

export default Admin; 