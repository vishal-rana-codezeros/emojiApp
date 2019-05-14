import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core'

const styles={
  root:{
    marginLeft:'70px'
  }
  
}
class ContactUs extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn ">
       Coming Soon
      </div>
    );
  }
}

export default  connect(null) (withStyles(styles)(ContactUs));

