import { FormControl, TextField, Button, Container } from '@material-ui/core';
import React, { Component } from 'react';
import "./../css/admin.scss";
import { variables } from '../api/Variables';
import { AuthConsumer } from '../hooks/AuthContext';


class Admin extends Component {  
  constructor(props){
    super(props);

    this.state={
      login:[],
      username: '',
      password: '',
    }
  }

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
        console.log(res.status);
        if(res.status === 200) {
          window.location.assign("/admin/dashboard");
        } else {
          alert('Login Failed!')
        }
      })
      .then((result)=>{
        // this.refreshList();
        // console.log(result);
      },(error)=>{
        alert('Failed');
      })
  }  

  render() {
    const {username} = this.state;
    const {password} = this.state;

    return(
      <>
        <Container>
          <h3>Admin Login</h3>
          <div className='sign-in'>
            
            <AuthConsumer>
              {props =>{
                const {AdminUsername, IsAuthenticated, LogIn, LogOut, AuthData} = props; 
                  return (

                  <form autoComplete="off" >
                    <FormControl component="div" fullWidth>
                      <div className="flex-container">
                        <TextField required label="Username" name="username" onChange={(e) =>  this.setState({username : e.target.value})}/><br/>
                        <TextField required label="Password" name="password" type='password' onChange={(e) => this.setState({password: e.target.value})} /><br/><br/>
                        <Button variant="outlined" color="secondary" onClick={() => {LogIn(username); this.triggerLogin(username, password);}}>
                          Sign-In
                        </Button><br/>
                        <span><a href="/contact">or contact the CEO</a></span>
                      </div>
                      </FormControl>
                  </form>
                    )
                  }
                }
              </AuthConsumer>
          </div>
        </Container>
      </>
      )
  }

}

export default Admin; 