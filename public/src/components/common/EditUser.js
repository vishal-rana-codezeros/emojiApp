import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneUser, updateUser } from '../../action/user.action';
// import { Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import validateInput from '../../shared/Users/Users';
class EditUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      fullName: '',
      userName: '',
      contactNumber: '',
      emailId: '',
      errors: {},
      isValid: false,
      isSubmit: false,
      isLogin: true
    };

    this.onTextChange = this.onTextChange.bind(this)
    this.onClickToEdit = this.onClickToEdit.bind(this)

  }
  toggle = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) {
        // console.log("id in edit",this.props)
        this.props.getOneUser(this.props.editId).then((res) => {

          if (res.status == 200) {
            console.log("data in edit user", res)
            this.setState({ fullName: res.data.data.fullName })
            this.setState({ userName: res.data.data.userName })
            this.setState({ contactNumber: res.data.data.contactNumber })
            this.setState({ emailId: res.data.data.emailId })
          }
        })
      }
    });
  };

  onClickToEdit = (e) => {
    e.preventDefault();
    this.setState({ isSubmit: true });
    if (this.isValid(this.state)) {
      this.setState({ isSubmit: false });
      this.props.updateUser(this.props.editId, this.state).then((res) => {

        if (res.status == 200) {
          this.props.getUser();
        }
      })
      const { onClick, editId } = this.props;

      this.setState({ open: !this.state.open });
    }
  }
  onTextChange(event) {
    if(event.target.name === 'contactNumber') {
      const re = /^[0-9\b]+$/;

      if (event.target.value === '' || re.test(event.target.value)) {
        this.setState({ [event.target.name]: event.target.value }, () => {
          if (this.state.isSubmit) {
            this.isValid(this.state);
          }
        });
      }
    } else {
      this.setState({ [event.target.name]: event.target.value }, () => {
        if (this.state.isSubmit) {
          this.isValid(this.state);
        }
      });
    }
    
  }

  isValid = (data) => {
    let { isValid, errors } = validateInput(data);

    this.setState({ isValid, errors });

    return isValid;
  }

  render() {
    let { errors } = this.state
    return (
      <>
        <IconButton aria-label="Edit" onClick={this.toggle}>
          <EditIcon fontSize="small" />
        </IconButton>
        <Modal isOpen={this.state.open}>
          <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col md="12" lg="12" xl="12">
                  <Card className="mx-4">
                    <CardBody className="p-4">
                      <Form>
                      
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss">Full Name</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="fullName" autoComplete="fullName" value={this.state.fullName} onChange={this.onTextChange}></Input>
                          {errors.fullName && <em className="has-error">{errors.fullName}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                        <InputGroup className="mb-12">
                            <InputLabel className="labelcss">User Name</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="userName" value={this.state.userName} autoComplete="username" onChange={this.onTextChange} />
                          {errors.userName && <em className="has-error">{errors.userName}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                        <InputGroup className="mb-12">
                            <InputLabel className="labelcss" className="labelcss">Email Id</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="emailId" value={this.state.emailId} autoComplete="email" onChange={this.onTextChange} />
                          {errors.emailId && <em className="has-error">{errors.emailId}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                        <InputGroup className="mb-12">
                            <InputLabel className="labelcss">Contact Number</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-volume-control-phone"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="contactNumber" value={this.state.contactNumber} autoComplete="contactNumber" onChange={this.onTextChange} />
                          {errors.contactNumber && <em className="has-error">{errors.contactNumber}</em>}
                        </InputGroup>
                      </Form>
                    </CardBody>
                    <CardFooter className="p-12">
                      <Row>
                        <Button className="editbtncss" color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="danger" className="editbtncss" onClick={this.onClickToEdit}>Save</Button>
                      </Row>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default connect(null, { getOneUser, updateUser })(EditUser);

// export default EditUser;