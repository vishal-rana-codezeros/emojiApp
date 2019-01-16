import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addKeyboard, getAllCategory,getActiveCatList } from '../../action/user.action';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardFooter, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import validateInput from '../../shared/Keyboard/KeyboardValidate';
import Select from './Select';
import SelectSimple from './SelectSimple';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

// var FileInput = require('./fileInput')
class AddKeyboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      keyboardName: '',
      categoryName: '',
      cost: '',
      image:[],
      keyboardType: '',
      imgSrc: [],
      errors: {},
      isValid: false,
      isSubmit: false,
      isLogin: true,
      dropdownOpen: false,
      value: "Home",
      categoryOptions: [],
      keyboardTypeOption: ['free', 'paid'],
      page: 0,
      pageSize: 10,
    };
    this.onDrop = this.onDrop.bind(this);
    this.onTextChange = this.onTextChange.bind(this)
    this.onClickToAdd = this.onClickToAdd.bind(this)
    this.handleselect = this.handleselect.bind(this)
  }
  toggle = () => {
    this.setState({ open: !this.state.open }, () => {

    });
    this.setState({ errors: {} })
  };


  componentWillMount() {
    const { page, pageSize } = this.state;
    this.props.getActiveCatList().then((res) => {
      if (res.status == 200) {
        console.log("categories===>", res.data.data)
        // return false;
        const { data } = res.data
        const { categoryOptions } = this.state
        data.map(x => categoryOptions.push({ id: x._id, value: x.categoryName }))
      }
    })
  }


  onDrop(imgSrc) {
    this.setState({
      imgSrc
    });
  }

  onClickToAdd = async (e) => {
    e.preventDefault();
    this.setState({ isSubmit: true });
    const {imgSrc} = this.state;

    const formData = new FormData();    
    imgSrc.map(img => {
      formData.append("img", img);
    })

    if (this.isValid(this.state)) {
      this.setState({ isSubmit: false });

      var data = await axios.post('http://66.70.179.133:5001/emojiApp/v2/api/user/imageUpload', formData);
      this.state.image = data.data.data;
      await this.props.addKeyboard(this.state).then((res, err) => {
        console.log("res, err", res, err);
        console.log("request in add keyboard=============image============>",this.state.image)
        if (res.data.code == 400) {
          this.setState({ errors: { ...this.state.errors, keyboardName: res.data.message } })

        } else {
          this.setState({
            open: !this.state.open,
            keyboardName: '',
            categoryName: '',
            cost: '',
            keyboardType: ''
          });
          this.props.getUser();
        }
      })
      const { onClick, editId } = this.props;
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
    console.log("errors",errors)
    return (
      <>
        <IconButton aria-label="Edit"className="addButtonCss"  onClick={this.toggle}>
          <AddCircleOutline  fontSize="large" />
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

                          </InputGroupAddon>
                          <Input type="text" name="keyboardName" autoComplete="Name" value={this.state.keyboardName} onChange={this.onTextChange}></Input>
                          {errors.keyboardName && <em className="has-error">{errors.keyboardName}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss">Category</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                          </InputGroupAddon>
                          <Select
                            name={'categoryName'}
                            options={this.state.categoryOptions}
                            value={this.state.categoryName}
                            placeholder={'Select categoryName'}
                            handlechange={this.handleselect}
                          />

                          {errors.categoryName && <em className="has-error">{errors.categoryName}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss" className="labelcss">Type</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">

                          </InputGroupAddon>
                          <SelectSimple
                            name={'keyboardType'}
                            options={this.state.keyboardTypeOption}
                            value={this.state.keyboardType}
                            placeholder={'Select keyboardType'}
                            handlechange={this.handleselect}
                          />
                          {errors.keyboardType && <em className="has-error">{errors.keyboardType}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss">Cost</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">

                          </InputGroupAddon>
                          <Input type="Number" name="cost" value={this.state.cost} autoComplete="cost" onChange={this.onTextChange} disabled={this.state.keyboardType == 'free'} />
                          {errors.cost && <em className="has-error">{errors.cost}</em>}

                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss" className="labelcss">Stickers</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">

                          </InputGroupAddon>
                          <ImageUploader
                          value={this.state.imgSrc}
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif','.jpeg']}
                            maxFileSize={5242880}
                            withPreview={true}
                          />
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
export default connect(null, { addKeyboard, getAllCategory,getActiveCatList })(AddKeyboard);

