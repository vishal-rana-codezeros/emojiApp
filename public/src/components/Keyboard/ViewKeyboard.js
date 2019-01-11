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
    this.onDrop = this.onDrop.bind(this);
  }
  toggle = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) {
        this.props.getOneKeyboardDetails(this.props.viewId).then((res) => {

          if (res.status == 200) {
            console.log("data in edit keyboard===================================>", res.data.data)
            this.setState({ keyboardName: res.data.data.keyboardName, categoryName: res.data.data.categoryName.categoryName, keyboardType: res.data.data.keyboardType, cost: res.data.data.cost, image: res.data.data.image })
            console.log("state===================++++++++++++++++++++++++++", this.state)
          }
        })
      }
    });
  };

  onDrop(imgSrc) {
    this.setState({
      imgSrc
    });
  }

  render() {

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
                            {/* <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText> */}
                          </InputGroupAddon>
                          <Input type="text" name="keyboardName" autoComplete="Name" value={this.state.keyboardName} onChange={this.onTextChange}></Input>

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
                          <Input type="text" name="categoryName" value={this.state.categoryName} autoComplete="categoryName" onChange={this.onTextChange} />

                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss" className="labelcss">Type</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>@</InputGroupText> */}
                          </InputGroupAddon>
                          <Input type="text" name="keyboardType" value={this.state.keyboardType} autoComplete="keyboardType" onChange={this.onTextChange} />

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
                          <Input name="cost" value={this.state.cost} />

                        </InputGroup>
                        <InputGroup className="mb-12">
                          <InputGroup className="mb-12">
                            <InputLabel className="labelcss" className="labelcss">Stickers</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">

                          </InputGroupAddon>
                          <ImageUploader
                          value={this.state.image}
                            withIcon={false}
                            buttonText=''
                           imgExtension={['.jpg', '.gif', '.png', '.gif','.jpeg']}
                            // maxFileSize={5242880}
                            withPreview={true}
                          />
                          {/* <ImageProcessor
                            alt='react image sample'
                            src='./path/to/image.jpg'
                            effect='brighten'
                            options={{ value: 50 }}
                          /> */}
                        </InputGroup>
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


























