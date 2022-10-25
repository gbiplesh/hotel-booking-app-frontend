import React, {Component, createRef, useState} from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter,TablePagination, Paper, Container, Modal, Button } from '@material-ui/core';
import {Delete, Edit} from '@material-ui/icons';
import { variables } from '../api/Variables';
import "./../css/showTables.scss";
import CheckoutModal from './CheckoutModal';


class ShowCheckoutTable extends Component {
  
  constructor(props){
    super(props);

    this.state={
      checkouts:[]
    }
  }

  //Method to resfresh the Room data from the Get API method
  refreshList(){
    fetch(variables.API_URL+'api/checkouts')
    .then(response=>response.json())
    .then(data=>{
      this.setState({checkouts:data});
    });
  }

  componentDidMount(){
      this.refreshList();
  }

  deleteCheckout(id){ 
    if(window.confirm('Do you want to delete this data permanently?')){
    fetch(variables.API_URL+'api/checkouts/'+id,{
      method:'DELETE',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      }
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })}
    window.location.reload();

  }
  
  //Edit Checkout
  triggerEditCheckout(id, firstName, lastName, email, phone, dob, verify){
    
    fetch(variables.API_URL+'api/checkouts',{
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "Id": id,
        "FirstName": firstName,
        "LastName": lastName,
        "Email": email,
        "Phone": phone,
        "DOB": dob,
        "VerificationID": verify
      })
      })
      .then(res=>res.json())
      .then((result)=>{
        this.refreshList();
      },(error)=>{
        alert('Failed');
      })
      alert('Checkout Data Updated!');
      window.location.reload();
  }

  // Add Checkouts
  triggerAddCheckout(id, firstName, lastName, email, phone, dob, verify) {
    
    fetch(variables.API_URL+'api/checkouts',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        // "Id": id, 
        "FirstName": firstName,
        "LastName": lastName,
        "Email": email,
        "Phone": phone,
        "DOB": dob,
        "VerificationID": verify
      })
      })
      .then(res=>res.json())
      .then((result)=>{
        this.refreshList();
      },(error)=>{
        alert('Failed');
      })
      alert('Checkout Data Added!');
      window.location.reload();
}  


  render() {
    
    const{checkouts} = this.state;

    return (
      <>
        <Container>
          <div className="above-table">
            <h4>Checkout List:</h4>
            <CheckoutModal
              icon="Add Checkout" 
              modalButtonText="Add" 
              roomId="Id will be automated."
              buttonOnClick={this.triggerAddCheckout.bind(this)}
              />
          </div>
          
          <TableContainer component={Paper} className="table-header">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-row">
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Date of Birth</TableCell>
                  <TableCell align="center">Verification ID</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                      {
                        checkouts.map(checkout => (
                          <TableRow
                          key={checkout.Id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                          <TableCell align="center">{checkout.Id}</TableCell>
                          <TableCell align="center">{checkout.FirstName}</TableCell>
                          <TableCell align="center">{checkout.LastName}</TableCell>
                          <TableCell align="center">{checkout.Email}</TableCell>
                          <TableCell align="center">{checkout.Phone}</TableCell>
                          <TableCell align="center">{checkout.DOB}</TableCell>
                          <TableCell align="center">{checkout.VerificationID}</TableCell>
                          <TableCell align="center" className="icons-cell">
                            <span><CheckoutModal 
                                    icon={<Edit/>} 
                                    room={checkout}
                                    modalButtonText="Edit" 
                                    buttonOnClick={this.triggerEditCheckout.bind(this)} 
                                    checkoutId={checkout.Id} 
                                    firstName={checkout.FirstName}
                                    lastName={checkout.LastName}
                                    email={checkout.Email}
                                    phone={checkout.Phone}
                                    dob={checkout.DOB}
                                    verify={checkout.VerificationID}
                                    /></span>
                            <span><Button variant="outlined" onClick={() => this.deleteCheckout(checkout.Id)}><Delete/></Button></span>
                          </TableCell>
                        </TableRow>
                      ))
                    }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </>
    )
  }
}

export default ShowCheckoutTable; 