import React, { Component } from 'react';
import { recordCount } from '../../action/auth.action'
import { connect } from 'react-redux';

import {
  Card,
  CardBody,
  Col,
  Row
} from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0
    };
  }

  componentWillMount() {
    this.props.recordCount(this.state).then(res => {
      if (res.data.code) {
        // console.log("if part data",res.data)
        this.setState({ userCount: res.data.data })
        // console.log("userCount",this.state.userCount
      } else {
        //  console.log("else part")
      }
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">

                <div className="text-value">
                <label>Users: </label>
                <label>{this.state.userCount}</label>
                
                </div>
                {/* <div className="text-value"> {this.state.userCount}</div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(null, { recordCount })(Dashboard);

