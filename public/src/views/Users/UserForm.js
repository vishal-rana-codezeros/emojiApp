import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import validateInput from '../../shared/Users/Users';

import {
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
  } from 'reactstrap';
  
class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        userName: '',
        fullName: '',
        emailId: '',
        contactNumber: '',
        errors: {},
        isValid: false, 
        isSubmit: false,        
    }

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  isValid = (data) => {
    let { isValid, errors } = validateInput(data);
    
    this.setState({isValid, errors});

    return isValid;
  }

  onChangeValue = (e) => {
    this.setState({[e.target.id] : e.target.value}, () => {
        if(this.state.isSubmit) {
          this.isValid(this.state);
        }
      });
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    this.setState({isSubmit: true});

    if(this.isValid(this.state)) {
    //   this.props.LoginApi(this.state).then(res => {        
    //     if(res.data.code) {
    //       this.setState({errors: {...this.state.errors, header: res.data.message}})
    //       setTimeout(() => {
    //         this.setState({errors: {...this.state.errors, header: ""}})
    //       }, 4000)
    //     } else {
    //       this.props.history.push('/dashboard');
    //     }
    //   }) ;
    //   this.setState({isSubmit: false});
      
    }
  }

  render() {
    console.log("this.state", this.state);
    return (
        <Row>   
            <Col xs="12" sm="12">
                <Card>
                <CardHeader>
                    <strong>Add User</strong>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="userName">Username</Label>
                            <Input type="text" id="userName" value={this.state.userName} onChange={this.onChangeValue} placeholder="Enter your username" required />
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input type="text" id="fullName" value={this.state.fullName} onChange={this.onChangeValue} placeholder="Enter your Full Name" required />
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="emailId">Email Address</Label>
                            <Input type="email" id="emailId" value={this.state.emailId} onChange={this.onChangeValue} placeholder="Enter your Email Address" required />
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input type="text" id="contactNumber" value={this.state.contactNumber} onChange={this.onChangeValue} placeholder="Enter your Contact Number" required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Button variant="contained" className="primaryButton" color="primary" onClick={this.onClickSubmit}>  
                                Save
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
                </Card>
            </Col>
        </Row>
    );
  }
}

export default connect(null)(UserForm);
