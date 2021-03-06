import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import IsAuthenticate from './components/auth/Require_auth';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core';
import './App.scss';

const styles={
  root:{
   
    textAlign:'center',
    marginTop:' 20%'
  }
}

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {
  render() {
    return (
        <HashRouter>
            <Switch>
         
                <Route exact path="/login" name="Login Page" component={Login} />
                <Route exact path="/register" name="Register Page" component={Register} />
                <Route exact path="/404" name="Page 404" component={Page404} />
                <Route exact path="/500" name="Page 500" component={Page500} />
                <Route path="/" name="Home" component={IsAuthenticate(DefaultLayout)} />
            
            </Switch>
        </HashRouter>
    );
  }
    
}

export default  withStyles(styles)(App);
