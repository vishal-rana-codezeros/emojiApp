import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneCategoryData } from '../../action/user.action';
// import { Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';

class ViewCategory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      category: '',
      image: []
    };
  }
  toggle = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) {
        this.props.getOneCategoryData(this.props.viewId).then((res) => {

          if (res.status == 200) {
            this.setState({category: res.data.data.categoryName, image:  res.data.data.image})
          }
        })
      }
    });
  };

 

  render() {
  
    let { errors } = this.state
    let displayImagePreview = [];
		for (let index = 0; index < this.state.image.length; index++) {
			displayImagePreview.push(
				<div className="uploadPictureContainer">
					<img src={this.state.image[index]} className="uploadPicture" alt="preview" />
				</div>
			);
		}
    return (
      <>
        <IconButton aria-label="Edit"  onClick={this.toggle}>
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
                            <InputLabel className="labelcss">Category</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                          </InputGroupAddon>
                          <Input type="text" name="category" value={this.state.category} autoComplete="category" onChange={this.onTextChange} disabled/>
                        </InputGroup>
                        <div className="fileContainer">
													<InputGroup className="mb-12">
														<InputGroup className="mb-12">
															<InputLabel className="labelcss">Display Image</InputLabel>
														</InputGroup>
														<InputGroupAddon addonType="prepend" />
													</InputGroup>
													{displayImagePreview}
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
export default connect(null, { getOneCategoryData })(ViewCategory);


























