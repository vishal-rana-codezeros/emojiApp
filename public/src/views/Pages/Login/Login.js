import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginApi } from '../../../action/auth.action';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import validateInput from '../../../shared/Login/login';
import ForgotPassword from './ForgotPassword';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailId: "",
      password: "",
      errors: {},
      isValid: false,
      isSubmit: false,
      isLogin: true,
      loading: true
    }

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onChangeToForgotPassword = this.onChangeToForgotPassword.bind(this);
  }

  componentDidMount() {
    if (this.props.Auth.isAuthenticate) {
      this.props.history.push('/dashboard');
    }
  }

  onChangeValue = (e) => {

    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.isSubmit) {
        this.isValid(this.state);
      }
    });

  }

  isValid = (data) => {
    let { isValid, errors } = validateInput(data);

    this.setState({ isValid, errors });

    return isValid;
  }

  onClickLogin = (e) => {
    e.preventDefault();
    this.setState({ isSubmit: true });

    if (this.isValid(this.state)) {
      this.props.LoginApi(this.state).then(res => {
        if (res.data.code) {
          this.setState({ errors: { ...this.state.errors, header: res.data.message } })
          setTimeout(() => {
            this.setState({ errors: { ...this.state.errors, header: "" } })
          }, 4000)
        } else {
          this.props.history.push('/dashboard');
        }
      });
      this.setState({ isSubmit: false });

    }
  }

  onChangeToForgotPassword = (status) => {
    this.setState({
      isLogin: status,
      emailId: "",
      password: "",
      errors: {},
      isValid: false,
      isSubmit: false,
    })
  }

  render() {
    const { errors } = this.state;
    const inlineStyle = {
      color: "white"
    }
    const { loading } = this.state;

   
    return (

      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
              
                {this.state.isLogin && <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onClickLogin}>
                      <h1 style={inlineStyle}>Login</h1>
                      <p style={inlineStyle}>Sign In to your account</p>
                      {this.state.errors.header && <Alert color="danger">
                        {this.state.errors.header}
                      </Alert>}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email Address" name="emailId" value={this.state.emailId} onChange={this.onChangeValue} autoComplete="emailId" />
                        {errors.emailId && <em className="has-error">{errors.emailId}</em>}
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChangeValue} autoComplete="current-password" />
                        {errors.password && <em className="has-error">{errors.password}</em>}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4 loginButtonCss" onClick={this.onClickLogin}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0 forgotLinkCss" onClick={(e) => this.onChangeToForgotPassword(false)}>Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>}
                {!this.state.isLogin && <ForgotPassword onChange={this.onChangeToForgotPassword} />}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Auth: state.Auth
})

export default connect(mapStateToProps, { LoginApi })(Login);
