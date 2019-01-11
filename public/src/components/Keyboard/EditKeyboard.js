import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneKeyboardDetails, updateKeyboardDetails, getAllCategory, getActiveCatList } from '../../action/user.action';
// import { Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import validateInput from '../../shared/Keyboard/KeyboardValidate';
import { withAlert } from 'react-alert'
import SelectSimple from './SelectSimple';
import Select from './Select'
import ImageUploader from 'react-images-upload';
import { componentWillAppendToBody } from "react-append-to-body";
import axios from 'axios';
class EditKeyboard extends React.Component {
  constructor(props) {
    super(props)
   
    this.state = {
      open: false,
      keyboardName: '',
      categoryName: '',
      cost: '',
      image: [],
      imgSrc: [],
      keyboardType: '',
      errors: {},
      isValid: false,
      isSubmit: false,
      isLogin: true,
      categoryOptions: [],
      keyboardTypeOption: ['free', 'paid'],
      page: 0,
      pageSize: 10,
     
    };
  
    
    this.onDrop = this.onDrop.bind(this);
    this.onTextChange = this.onTextChange.bind(this)
    this.onClickToEdit = this.onClickToEdit.bind(this)
    this.handleselect = this.handleselect.bind(this)
 
  }
  toggle = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) {
        this.props.getOneKeyboardDetails(this.props.editId).then((res) => {

          if (res.status == 200) {
            // console.log("data in edit keyboard", res.data.data)
            this.setState({ keyboardName: res.data.data.keyboardName, categoryName: res.data.data.categoryName, keyboardType: res.data.data.keyboardType, cost: res.data.data.cost,image:res.data.data.image})
          }
        })
      }
    });

    setTimeout(() => {
      var elements1  = document.getElementsByClassName('uploadPicturesWrapper');
      const d = document.createElement("div",{}, "dsfdsfdsdsf")
      //elements1.appendChild(d);
    }, 1000)
    
    //
  };
  componentWillMount() {
    const { page, pageSize } = this.state;
    this.props.getActiveCatList().then((res) => {
      if (res.status == 200) {
        // console.log("categories===>", res.data.data)
        // return false;
        const { data } = res.data
        const { categoryOptions } = this.state
        data.map(x => categoryOptions.push({ id: x._id, value: x.categoryName }))
      }
    })
  }

  getContent() {
    return (<div className="uploadPictureContainer">
              <div className="deleteImage">X</div>
              <img src="http://res.cloudinary.com/yunu121/image/upload/v1547115311/irpwvk0er1mf66wywlnh.jpg" className="uploadPicture" alt="preview" />
    </div>);
  }

  componentDidMount(){
   
   

  }

  onDrop(imgSrc) {
    console.log("drop",imgSrc);
    this.setState({
      imgSrc
    });
  }
  onClickToEdit = async (e) => {
    e.preventDefault();
    this.setState({ isSubmit: true });
    const { imgSrc } = this.state;

    const formData = new FormData();
    imgSrc.map(img => {
      formData.append("img", img);
    })

    var data = await axios.post('http://66.70.179.133:5001/emojiApp/v2/api/user/imageUpload', formData);
console.log("data.data.data",data.data.data)
// return false;
    this.state.image.push( data.data.data[0]);
    if (this.isValid(this.state)) {
      this.setState({ isSubmit: false });
      await this.props.updateKeyboardDetails(this.props.editId, this.state).then((res) => {
        if (res.data.code == 400) {
          this.setState({ errors: { ...this.state.errors, keyboardName: res.data.message } })
        } else {
          this.setState({ open: !this.state.open });
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
    console.log("this.state", this.state);
    return (
      <>
        <IconButton aria-label="Edit" onClick={this.toggle}>
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
                            name={'categoryName'}
                            options={this.state.categoryOptions}
                            value={this.state.categoryName}
                            placeholder={'Select categoryName'}
                            handlechange={this.handleselect}
                          />
                          {/* <Input type="text" name="categoryName" value={this.state.categoryName} autoComplete="categoryName" onChange={this.onTextChange} /> */}
                          {errors.categoryName && <em className="has-error">{errors.categoryName}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss" className="labelcss">Type</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>@</InputGroupText> */}
                          </InputGroupAddon>
                          <SelectSimple
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
                          <Input type="number" name="cost" value={this.state.cost} autoComplete="cost" onChange={this.onTextChange} disabled={this.state.keyboardType == 'free'} />
                          {errors.cost && <em className="has-error">{errors.cost}</em>}
                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss" className="labelcss">Stickers</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                          </InputGroupAddon>
                         {/* <><div class="uploadPictureContainer" style=""><div class="deleteImage">X</div><img src="data:image/jpeg;name=logo.jpeg;base64,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" class="uploadPicture" alt="preview"></div></> */}
                          <ImageUploader
                              // value={this.state.imgSrc}
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
export default connect(null, { getOneKeyboardDetails, updateKeyboardDetails, getAllCategory, getActiveCatList })(EditKeyboard);

