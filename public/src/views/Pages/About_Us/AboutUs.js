import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
// import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html'
// import { convertFromHTML, ContentState, convertToRaw } from 'draft-js';
// import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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
      isSubmit: false
    };
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onClickToSave = this.onClickToSave.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentWillMount() {
    this.getAbout();
  }

  getAbout = () => {
    this.props.getAboutusPage().then((res) => {
      if (res.status == 200) {
        if (res.data.data[0]) {
          const { _id, title, description} = res.data.data[0]?res.data.data[0]:{};
          this.setState({ id: _id, title, description })
        }
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
    const {id} = this.state;
    this.setState({ isSubmit: true });
    if(!id) {
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
    
    return (
      <div className="aboutUsCss">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>About Us</strong>
              </CardHeader>
              <CardBody className="aboutUsCss">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input"><strong>Content:</strong></Label>
                    </Col>

                    <Col xs="12" md="9">
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
              <CardFooter>

                {this.state.id && <Button type="submit" size="sm" color="success" onClick={this.onClickToSave}><i className="fa fa-dot-circle-o"></i> Update</Button>}
                {!this.state.id && <Button type="submit" size="sm" color="success" onClick={this.onClickToSave}><i className="fa fa-dot-circle-o"></i> Save</Button>}
                <Button type="reset" size="sm" color="danger" onClick={this.onReset}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>

          </Col>

        </Row>
      </div>
    )
  }
}

export default connect(null, { addAboutusPage, getAboutusPage, updateAboutusPage })(AboutUs);




























// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {withStyles} from '@material-ui/core'

// const styles={
//   root:{
//     marginLeft:'70px'
//   }

// }
// class AboutUs extends Component {
//   loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

//   render() {

//     return (
//       <div className="animated fadeIn ">
//        Coming Soon
//       </div>
//     );
//   }
// }

// export default  connect(null) (withStyles(styles)(AboutUs));

