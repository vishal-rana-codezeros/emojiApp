import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core'
import Categoirsmain from './Categoriesmain'
const styles={
  root:{
    marginLeft:'70px'
  }
  
}
class KeyCategories extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn ">
       <Categoirsmain/>
      </div>
    );
  }
}

export default  connect(null) (withStyles(styles)(KeyCategories));

