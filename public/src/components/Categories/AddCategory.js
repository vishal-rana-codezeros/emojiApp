import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCategory} from '../../action/user.action';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardFooter, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Container, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import validateInput from '../../shared/Category/CategoryValidate';
class AddCategory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      category: '',
      errors: {},
      isValid: false,
      isSubmit: false,
      isLogin: true,
      page: 0,
      pageSize: 10,
    };
   
    this.onTextChange = this.onTextChange.bind(this)
    this.onClickToAdd = this.onClickToAdd.bind(this)
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
      this.props.addCategory(this.state).then((res) => {
        console.log("response in add category",res)
        
          this.setState({ 
            open: !this.state.open,
            category: ''
          });
          this.props.getUser();
    
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
 
  isValid = (data) => {
    let { isValid, errors } = validateInput(data);

    this.setState({ isValid, errors });

    return isValid;
  }

  render() {

    let { errors } = this.state
    return (
      <>
        <IconButton aria-label="Edit"className="addButtonCss" onClick={this.toggle}>
          <AddCircleOutline fontSize="large" />
        </IconButton>
        <Modal isOpen={this.state.open}>
          <ModalHeader toggle={this.toggle}>Add Category</ModalHeader>
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
                         
                          <Input type="text" name="category" value={this.state.category} autoComplete="cost" onChange={this.onTextChange}  />
                          {errors.category && <em className="has-error">{errors.category}</em>}
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
export default connect(null, { addCategory})(AddCategory);

