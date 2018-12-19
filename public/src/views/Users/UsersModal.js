import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getAllUser, deleteUser } from '../../action/user.action';
import Datatable from '../../components/datatable/Datatable';
import Datatablewithfilter from '../../components/datatable/Datatablewithfilter';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import EditUser from '../../components/common/DeleteConfirmDialog';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
// import Griddle from 'griddle-react';

class UsersModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [],
      pages: 1,
      loading: false,
      filter: ''
    }

    this.onChangeToFetchTable = this.onChangeToFetchTable.bind(this);
    this.onClickToDelete = this.onClickToDelete.bind(this);
    this.onClickToEdit = this.onClickToEdit.bind(this);
    this.onChangeToFilterValue = this.onChangeToFilterValue.bind(this);
    this.onChangeToFetchTablefiltere = this.onChangeToFetchTablefiltere.bind(this);
  }

  // componentDidMount() {
  //   this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }


  onChangeToFetchTable = (state, instance) => {
    // console.log("action, tableState", action, tableState);
    this.setState({ loading: true })
    this.props.getAllUser(state.page, state.pageSize, state.sorted, state.filtered).then((res) => {
      if (res.data.code == 200) {
        const { total, limit } = res.data.data;
        this.setState({ tableData: res.data.data.docs, pages: Math.ceil(total / limit), loading: false })
        console.log("resdata===========================>", res.data.data.docs)
      }
    })
  }
  onChangeToFilterValue = (data) => {
    this.setState({ filter: data.target.value })
    console.log("in changetofilter value", this.state.filter)
    return (<Datatablewithfilter data={this.state.tableData} onFetchData={this.onChangeToFetchTablefiltere} loading={this.state.loading} filter={this.state.filter} />)
  }
  onChangeToFetchTablefiltere = (state, instance) => {
    console.log(" in onChangeToFetchTablefiltere", this.state)
    this.setState({ loading: true })
    this.props.getAllUserFilter(this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered, this.state.filter).then((res) => {
      if (res.data) {
        const { total, limit } = res.data.data;
        this.setState({ tableData: res.data.data.docs, pages: Math.ceil(total / limit), loading: false })
        console.log("resdata===========================>", res.data.data.docs)
      }
    })
  }

  onClickToDelete = (id) => {

    console.log("id in delete", id)
    let someArray = this.state.tableData.slice(0, this.state.tableData.findIndex(x => x._id === id))
    console.log("someArray", someArray)
    // this.setState({tableData: someArray});

  }
  onClickToEdit = (id) => {
    console.log("id in delete", id)
    console.log("edit")
  }
  render() {
    console.log("tableData", this.state.tableData);
    const colorWhite = {
      // color: "white"
    }
    const columns = [{
      Header: 'Full Name',
      accessor: 'fullName', // String-based value accessors!
      width: 300,
      style: {}
    }, {
      Header: 'Email Address',
      accessor: 'emailId',
      width: 400,
      style: {}

    }, {
      Header: 'Contact Number',
      accessor: 'contactNumber', // Custom value accessors!
      width: 300,
      style: { textAlign: "center", }
    }, {
      Header: 'Status', // Custom header components!
      id: "status",
      accessor: d => d.status == 'ACTIVE' ? (<Badge color="success">Active</Badge>) : (<Badge color="secondary">Inactive</Badge>),
      width: 150,
      style: { textAlign: "center", }
    },
    {
      Header: "Action",
      Cell: row => (<>
        <IconButton aria-label="Delete" >
          <EditIcon fontSize="small" />
        </IconButton>
        <DeleteConfirmDialog deleteId={row.row._original._id} onClick={this.onClickToDelete} />
        {/* <EditUser deleteId={row.row._original._id} onClick={this.onClickToEdit} /> */}
      </>),
      style: { textAlign: "center", }
    }
    ]


    const { tableData } = this.state;

    return (
      <div >
        <Row >
          <Col xs="12" lg="12">
            <Card className="tablecss" >
              <CardHeader className="tablecss" style={{textAlign: 'center', fontSize:'20px',fontWeight:'600'}}>
                 Users List
              </CardHeader>
              <input type="text" className="searchcss" name="search" placeholder="Search.." onChange={this.onChangeToFilterValue} ></input>

              <CardBody style={colorWhite}>
                <Datatable data={tableData} columns={columns} onFetchData={this.onChangeToFetchTable} pages={this.state.pages} loading={this.state.loading} onChangeToFilterValue={this.onChangeToFilterValue} filter={this.state.filter} style={colorWhite} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(null, { getAllUser, deleteUser, Datatablewithfilter })(UsersModal);
