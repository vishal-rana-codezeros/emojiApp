import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import Spinner from '../../../Spinner/Spinner'
import { LoaderAction } from '../../../action/loader.action';
import { connect } from 'react-redux';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import { getAboutusPage, addAboutusPage, updateAboutusPage } from '../../../action/user.action';
import validateInput from '../../../shared/Users/AboutUsValidate';
import {logout} from '../../../action/auth.action'
// import {stateFromHTML} from 'draft-js-import-html';


class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      // flag: 0,
      id: "",
      errors: {},
      isValid: false,
      isSubmit: false,
      loading: false
    };
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onClickToSave = this.onClickToSave.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount() {
    this.props.LoaderAction(false)
    this.setState({ loading: true })
    this.getAbout()
    this.setState({ loading: false })
  }

  getAbout = () => {
    
    this.props.getAboutusPage().then((res) => {
     
      if (res.data.code == 200) {
        if (res.data.data) {
        
          const { _id, title, description } = res.data.data ? res.data.data : {};
          this.setState({ id: _id, title, description })
        }
      }
      else if(res.data.code==400)
      {
        this.props.logout();
      }
    })
  }

  onDescriptionChange(evt) {
    var newContent = evt.editor.getData();

    this.setState({
      description: newContent
    })
  }

  onClickToSave = (e) => {
    const { id } = this.state;
    this.setState({ isSubmit: true });
    if (!id) {
      this.state.descption = this.state.editorState
      this.props.addAboutusPage(this.state).then((res) => {
        this.setState({ isSubmit: false });
        this.getAbout()
      })
    } else {
      this.props.updateAboutusPage(this.state).then((res) => {
        this.setState({ isSubmit: false });
        this.getAbout()
      })
    }
  }

  onReset(event) {
    this.setState({ description: "" })
  }

  render() {
    const { descriptionVal } = this.state;
    let { errors } = this.state
    if (this.state.loading) {
      return (<Spinner loading={this.state.loading}></Spinner>)
    }
    return (

      <div>
        <Row>
          <Col xs="12" md="12">
            <Card >
              <CardHeader className="aboutUsCss">
                About Us
              </CardHeader>
              <CardBody className="aboutUsColor">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col xs="12" md="12">
                      <Label htmlFor="textarea-input"><strong>Content:</strong></Label>
                    </Col>

                    <Col xs="12" md="12">
                      <div>
                        <CKEditor
                          activeClass="editorCss"
                          content={this.state.description}
                          events={{
                            "change": this.onDescriptionChange
                          }}
                        />
                        {errors.descriptionVal && <em className="has-error">{errors.descriptionVal}</em>}
                      </div>
                    </Col>
                  </FormGroup>

                </Form>
              </CardBody>

              <CardFooter className="p-12">
                <Row > 
                  {this.state.id && <Button type="submit" size="sm" color="success" onClick={this.onClickToSave}><i className="fa fa-dot-circle-o"></i> Update</Button>}
                  {!this.state.id && <Button type="submit" size="sm" color="success" onClick={this.onClickToSave}><i className="fa fa-dot-circle-o"></i> Save</Button>}
                  <Button type="reset" size="sm" color="danger" onClick={this.onReset}><i className="fa fa-ban "></i> Reset</Button>
                </Row>
              </CardFooter>
             
            </Card>
            {/* className="editbtncss"  */}
          </Col>

        </Row>
      </div>
    )
  }
}

export default connect(null, { addAboutusPage, getAboutusPage, updateAboutusPage, LoaderAction, logout})(AboutUs);




























