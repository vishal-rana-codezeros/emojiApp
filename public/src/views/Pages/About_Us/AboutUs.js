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
      // descriptionVal: "",
      // editorState: EditorState.createEmpty(),
      description: "",
      title: "",
      // collapse: true,
      // fadeIn: true,
      // timeout: 300,
      flag: 0,
      id: "",
      errors: {},
      isValid: false,
      isSubmit: false
    };
    // this.onTextChange = this.onTextChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    // this.onEditorStateChange = this.onEditorStateChange.bind(this);
    // this.toggle = this.toggle.bind(this);
    // this.toggleFade = this.toggleFade.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    // this.onUpdate = this.onUpdate.bind(this);
  }
  componentDidMount() {
    this.props.getAboutusPage().then((res) => {
      if (res.status == 200) {
        console.log("res.data.data[0]", res.data.data[0].description);
        if (res.data.data[0]) {
          console.log(res.data.data[0])
          this.setState({ flag: 1 })
          this.setState({ id: res.data.data[0]._id, title: res.data.data[0].title, description: res.data.data[0].description }, () => {
            console.log(this.state)
          })
        }
      }
    })
  }

  onDescriptionChange(evt) {
      var newContent = evt.editor.getData();
    console.log("onChange fired with new vavugsdiudslue: ", newContent);

      this.setState({
        description: newContent
      })
    // this.setState({ description: event.blocks[0].text })
  }
  onSubmit(event) {

    this.setState({ isSubmit: true });

    this.state.descption = this.state.editorState

    this.props.addAboutusPage(this.state).then((res) => {

    })
  }
  onReset(event) {
    console.log("calling on reset")
    this.setState({ description: "" })
  }

  render() {
    const { descriptionVal } = this.state;
    let { errors } = this.state
    console.log("errors", this.state.errors)
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
                  {/* <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input"><strong>Title:</strong></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="title" value={this.state.title} placeholder="Title" onChange={this.onTextChange} />
                      {errors.title && <em className="has-error">{errors.title}</em>}
                    </Col>
                  </FormGroup> */}
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

                {this.state.flag == 1 && <Button type="submit" size="sm" color="success" onClick={this.onUpdate}><i className="fa fa-dot-circle-o"></i> Update</Button>}
                {this.state.flag == 0 && <Button type="submit" size="sm" color="success" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Save</Button>}
                {/* <Button type="submit" size="sm" color="primary" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Save</Button> */}
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

