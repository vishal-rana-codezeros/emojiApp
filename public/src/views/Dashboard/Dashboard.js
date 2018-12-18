import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { recordCount } from '../../action/auth.action'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
const styles = {
  root: {
    marginLeft: '70px'
  }

}

// const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

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
      <div className="animated fadeIn ">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">Users</div>
                <div>{this.state.userCount}</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">coming soon</div>
                <div>Stickers</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>
        </Row>
        </div>
    );
  }
}

export default connect(null, { recordCount })(withStyles(styles)(Dashboard));

