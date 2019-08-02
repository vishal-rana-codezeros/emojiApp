import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneKeyboardDetails, updateKeyboardDetails } from '../../action/user.action';
// import { Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import validateInput from '../../shared/Keyboard/KeyboardValidate';
import ImageUploader from 'react-images-upload';
// import ImageProcessor from 'react-image-processor';
class ViewKeyboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      keyboardName: '',
      categoryName: '',
      cost: '',
      keyboardType: '',
      image: [],
      imgSrc: []
    };
  
  }
  toggle = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) {
        this.props.getOneKeyboardDetails(this.props.viewId).then((res) => {

          if (res.status == 200) {
            
            this.setState({ keyboardName: res.data.data.keyboardName, categoryName: res.data.data.categoryName.categoryName, keyboardType: res.data.data.keyboardType, cost: res.data.data.cost, image: res.data.data.image })
          
          }
        })
      }
    });
 

  setTimeout(() => {
    var elements1  = document.getElementsByClassName('uploadPicturesWrapper');
   
    const d = document.createElement("div",{class:'custom-preview-image'}, "dsfdsfdsdsf")
   
  }, 1000)
};
 

  getContent() {
    return (<div className="uploadPictureContainer">
             
              <img src="http://res.cloudinary.com/yunu121/image/upload/v1547115311/irpwvk0er1mf66wywlnh.jpg" className="uploadPicture" alt="preview" />
    </div>);
  }
  createImage = (image) => {
   
    return(<div class="uploadPictureContainer" style="">
      
      <img src={image} class="uploadPicture" alt="preview"/>
      </div>)
  }
 
  render() {
    let imgPreview = [];
  
    for (let index = 0; index < this.state.image.length; index++) {
      
      imgPreview.push( <div className="uploadPictureContainer" >
       
         <img src={this.state.image[index]} className="uploadPicture" alt="preview"/>
         </div>);
    }
    let { errors } = this.state
    return (
      <>
        <IconButton aria-label="Edit" onClick={this.toggle}>
          <RemoveRedEyeIcon fontSize="small" />
        </IconButton>
        <Modal isOpen={this.state.open}>
          <ModalHeader toggle={this.toggle}>View Keyboard</ModalHeader>
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
                          <Input type="text" name="keyboardName" autoComplete="Name" value={this.state.keyboardName} disabled={true}></Input>

                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss">Category</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                          
                          </InputGroupAddon>
                          <Input type="text" name="categoryName" value={this.state.categoryName} autoComplete="categoryName" disabled={true}/>

                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss" className="labelcss">Type</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                          
                          </InputGroupAddon>
                          <Input type="text" name="keyboardType" value={this.state.keyboardType} autoComplete="keyboardType" disabled={true} />

                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss">Cost</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                           
                          </InputGroupAddon>
                          <Input name="cost" value={this.state.cost} disabled={true}/>

                        </InputGroup>
                        <div  className="fileContainer">
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss">Stickers</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">

                          </InputGroupAddon>
                         
                        </InputGroup>
                        {imgPreview}
                        </div>
                      </Form>
                    </CardBody>
                    <CardFooter className="p-12">
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
export default connect(null, { getOneKeyboardDetails, updateKeyboardDetails })(ViewKeyboard);


























