import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addKeyboard } from '../../action/user.action';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardFooter, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import validateInput from '../../shared/Keyboard/KeyboardValidate';
import Select from './Select'
class AddKeyboard extends React.Component {
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
      dropdownOpen: false,
      value: "Home",
      categoryOptions: ['cat1', 'cat2', 'cat3','cat4','cat5'],
      keyboardTypeOption:['free','paid']
    };
  
    this.onTextChange = this.onTextChange.bind(this)
    this.onClickToAdd = this.onClickToAdd.bind(this)
    this.handleselect= this.handleselect.bind(this)
  }
  toggle = () => {
    this.setState({ open: !this.state.open }, () => {

    });
    this.setState({errors: {}})
  };

  onClickToAdd = (e) => {
    e.preventDefault();
    this.setState({ isSubmit: true });
    if (this.isValid(this.state)) {
      this.setState({ isSubmit: false });
      this.props.addKeyboard(this.state).then((res) => {
        // console.log("response in add keyboard",res.data.message)
        if(res.data.code == 400)
        {
          this.setState({errors: {...this.state.errors,keyboardName: res.data.message}})
          
        }else {
          this.setState({ 
            open: !this.state.open,
            keyboardName: '',
            category: '',
            cost: '',
            keyboardType: '' 
          });
          this.props.getUser();
        }
      })
      const { onClick, editId } = this.props;

      // this.setState({ open: !this.state.open });
    }
  }
  onTextChange(event) {

    if (event.target.value === '') {
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
        <IconButton aria-label="Edit" onClick={this.toggle}>
          <AddCircleOutline fontSize="large" />
        </IconButton>
        <Modal isOpen={this.state.open}>
          <ModalHeader toggle={this.toggle}>Add Keyboard</ModalHeader>
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
                          <Input type="Number" name="cost" value={this.state.cost} autoComplete="cost" onChange={this.onTextChange} disabled={this.state.keyboardType=='free'} />
                          {errors.cost && <em className="has-error">{errors.cost}</em>}

                        </InputGroup>
                      </Form>
                    </CardBody>
                    <CardFooter className="p-12">
                      <Row>
                        <Button className="editbtncss" color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="danger" className="editbtncss" onClick={this.onClickToAdd}>Add</Button>
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
export default connect(null, { addKeyboard })(AddKeyboard);

