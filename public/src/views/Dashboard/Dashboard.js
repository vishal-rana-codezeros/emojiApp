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
import Spinner from '../../Spinner/Spinner'
import { red } from '@material-ui/core/colors';
// import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

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
      label: 'users',
      backgroundColor: '#e44242',
      borderColor: 'WHITE',

      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};
const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      male: 0,
      female: 0,
      loading:false
    };
  }
  
  componentWillMount() {
    this.setState({loading: true})
    this.props.recordCount(this.state).then(res => {
        if (res.data.code) {
          const {totalCounts, maleCounts, femalCounts} = res.data.data
          this.setState({ userCount: totalCounts, male:maleCounts,female:femalCounts, loading: false})
        } else {
        }
      });

  }

  // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    if (this.state.loading) {
      return(<Spinner loading={this.state.loading}></Spinner>)
    }
  
    return (
      <div className="animated fadeIn ">
        <Row>
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info cardcss">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                  </ButtonDropdown>
                </ButtonGroup>
                <Row>
                  <Col>
                    <div className="text-value">Users</div>
                    <div>{this.state.userCount}</div>
                  </Col>
                  <Col>
                    <div className="text-value">Male</div>
                    <div>{this.state.male}</div>
                  </Col>
                  <Col>
                    <div className="text-value">Female</div>
                    <div>{this.state.female}</div>
                  </Col>
                </Row>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '90px' }}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
              </div>
            </Card>
          </Col>
          {/* </Row>
        <Row> */}
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info cardcss">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">Stickers</div>
                <div>coming soon</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '90px' }}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info cardcss">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">Keyboards</div>
                <div>coming soon</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '90px' }}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
              </div>
            </Card>
          </Col>
          {/* </Row>
        <Row> */}
          <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info cardcss">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">Categories</div>
                <div>coming soon</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '90px' }}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(null, { recordCount})(withStyles(styles)(Dashboard));

