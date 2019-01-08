import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneCategoryData, updateCategory } from '../../action/user.action';
// import { Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import validateInput from '../../shared/Category/CategoryValidate';

class UpdateCategory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      category: '',
      errors: {},
      isValid: false,
      isSubmit: false,
      isLogin: true
    };

    this.onTextChange = this.onTextChange.bind(this)
    this.onClickToEdit = this.onClickToEdit.bind(this)
    this.handleselect= this.handleselect.bind(this)

  }
  toggle = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) {
        this.props.getOneCategoryData(this.props.editId).then((res) => {
       
          if (res.status == 200) {
            // console.log("data in edit keyboard", res.data.data)
            this.setState({category: res.data.data.category})
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
      this.props.updateCategory(this.props.editId, this.state).then((res) => {
        if(res.data.code == 400)
        {
          this.setState({errors: {...this.state.errors,category: res.data.message}})
        } else {
          this.setState({ open: !this.state.open });
          this.props.getUser();
        }
      })
      const { onClick, editId } = this.props;
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
    // console.log("errors", errors);
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
                            <InputLabel className="labelcss">Category</InputLabel>
                          </InputGroup>
                          <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText> */}
                          </InputGroupAddon>
                          
                          <Input type="text" name="category" value={this.state.category} autoComplete="category" onChange={this.onTextChange} />
                          {errors.category && <em className="has-error">{errors.category}</em>}
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
export default connect(null, { getOneCategoryData, updateCategory })(UpdateCategory);

