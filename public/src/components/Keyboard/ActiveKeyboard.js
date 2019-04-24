import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Cached from '@material-ui/icons/Cached';

class ActiveKeyboard extends React.Component {
  state = {
    open: false,
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  onClickToActive = () => {
      const {onClick, activeId} = this.props;
      
      onClick(activeId)
      this.setState({ open: !this.state.open });
  }
  
  render() {
    return (
      <>
        <IconButton aria-label="Delete"  onClick={this.toggle}>
          <Cached fontSize="small" />
        </IconButton>
        <Modal isOpen={this.state.open} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Active Keyboard</ModalHeader>
            <ModalBody>
                Are you sure you want to Active this Keyboard?
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>No</Button>
                <Button color="danger" onClick={this.onClickToActive}>Yes</Button>
            </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ActiveKeyboard;