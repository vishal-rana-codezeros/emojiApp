import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core'
import { LoaderAction } from '../../../action/loader.action';
const styles={
  root:{
    marginLeft:'70px'
  }
  
}
class ContactUs extends Component {
componentDidMount(){
  this.props.LoaderAction(false)
}

  render() {

    return (
      <div className="animated fadeIn ">
       Coming Soon
      </div>
    );
  }
}

export default  connect(null,{LoaderAction}) (withStyles(styles)(ContactUs));

