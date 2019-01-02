import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneKeyboardDetails, updateKeyboardDetails } from '../../action/user.action';
// import { Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import validateInput from '../../shared/Keyboard/KeyboardValidate';
import { withAlert } from 'react-alert'
import Select from './Select'
class EditKeyboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      keyboardName: '',
      category: '',
      cost: '',
      keyboardType: '',
      errors: {},
      isValid: false,
      isSubmit: false,
      isLogin: true,
      categoryOptions: ['cat1', 'cat2', 'cat3','cat4','cat5'],
      keyboardTypeOption:['free','paid']
    };

    this.onTextChange = this.onTextChange.bind(this)
    this.onClickToEdit = this.onClickToEdit.bind(this)
    this.handleselect= this.handleselect.bind(this)

  }
  toggle = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) {
        this.props.getOneKeyboardDetails(this.props.editId).then((res) => {
       
          if (res.status == 200) {
            // console.log("data in edit keyboard", res.data.data)
            this.setState({ keyboardName: res.data.data.keyboardName,category: res.data.data.category, keyboardType: res.data.data.keyboardType, cost: res.data.data.cost })
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
      this.props.updateKeyboardDetails(this.props.editId, this.state).then((res) => {
        // console.log("response in edit keyboard",res)
        if(res.status == 400)
        {
          	// this.props.alert.show("name already exist")
             console.log("already exist",res)
          }
        if (res.status == 200) {
          this.props.getUser();
        }
      })
      const { onClick, editId } = this.props;

      this.setState({ open: !this.state.open });
    }
  }
  onTextChange(event) {

      if (event.target.value === '' ) {
        this.setState({ [event.target.name]: event.target.value }, () => {
          if (this.state.isSubmit) {
            this.isValid(this.state);
          }
        });
      }
    else {
      this.setState({ [event.target.name]: event.target.value }, () => {
        if (this.state.isSubmit) {
          this.isValid(this.state);
        }
      });
    }
    
  }
  handleselect = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (this.state.isSubmit) {
        this.isValid(this.state);
      }
    });
};

  isValid = (data) => {
    let { isValid, errors } = validateInput(data);

    this.setState({ isValid, errors });

    return isValid;
  }

  render() {
  
    let { errors } = this.state
    return (
      <>
        <IconButton aria-label="Edit"  onClick={this.toggle}>
          <EditIcon fontSize="small" />
        </IconButton>
        <Modal isOpen={this.state.open}>
          <ModalHeader toggle={this.toggle}>Edit Keyboard</ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col md="12" lg="12" xl="12">
                  <Card className="mx-4">
                    <CardBody className="p-4">
                      <Form>
                      
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss">Name</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText> */}
                          </InputGroupAddon>
                          <Input type="text" name="keyboardName" autoComplete="Name" value={this.state.keyboardName} onChange={this.onTextChange}></Input>
                          {errors.keyboardName && <em className="has-error">{errors.keyboardName}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                        <InputGroup className="mb-12">
                            <InputLabel className="labelcss">Category</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText> */}
                          </InputGroupAddon>
                          <Select
                            name={'category'}
                            options={this.state.categoryOptions}
                            value={this.state.category}
                            placeholder={'Select category'}
                            handlechange={this.handleselect}
                          />
                          {/* <Input type="text" name="category" value={this.state.category} autoComplete="category" onChange={this.onTextChange} /> */}
                          {errors.category && <em className="has-error">{errors.category}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                        <InputGroup className="mb-12">
                            <InputLabel className="labelcss" className="labelcss">Type</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>@</InputGroupText> */}
                          </InputGroupAddon>
                          <Select
                            name={'keyboardType'}
                            options={this.state.keyboardTypeOption}
                            value={this.state.keyboardType}
                            placeholder={'Select keyboardType'}
                            handlechange={this.handleselect}
                          
                          />
                          {/* <Input type="text" name="keyboardType" value={this.state.keyboardType} autoComplete="keyboardType" onChange={this.onTextChange} /> */}
                          {errors.keyboardType && <em className="has-error">{errors.keyboardType}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                        <InputGroup className="mb-12">
                            <InputLabel className="labelcss">Cost</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                              <i className="fa fa-volume-control-phone"></i>
                            </InputGroupText> */}
                          </InputGroupAddon>
                          <Input type="number" name="cost" value={this.state.cost} autoComplete="cost" onChange={this.onTextChange} />
                          {errors.cost && <em className="has-error">{errors.cost}</em>}
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
export default connect(null, { getOneKeyboardDetails, updateKeyboardDetails })(EditKeyboard);

