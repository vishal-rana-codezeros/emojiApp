import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getAllUser, deleteUser } from '../../action/user.action';
import Datatable from '../../components/datatable/Datatable';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';


class UsersModal extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      tableData: [],
      pages: 1,
      loading: false 
    }

    this.onChangeToFetchTable = this.onChangeToFetchTable.bind(this);
    this.onClickToDelete = this.onClickToDelete.bind(this);
  }

  onChangeToFetchTable = (state, instance) => {    
    this.setState({loading: true})
    this.props.getAllUser(state.page, state.pageSize, state.sorted, state.filtered).then((res) => {
      if(res.data.code == 200) {
        const {total, limit} = res.data.data;
        this.setState({tableData : res.data.data.docs, pages: Math.ceil(total/limit), loading: false})
      }
    })
  }

  onClickToDelete = (id) => {    
    // this.props.deleteUser(id)
    let someArray = this.state.tableData.slice(0, this.state.tableData.findIndex(x => x._id === id))
    console.log("someArray", someArray)
    // this.setState({tableData: someArray});
    
  }
  
  render() {    
    console.log("tableData", this.state.tableData);
    const columns = [{
      Header: 'Full Name',
      accessor: 'fullName', // String-based value accessors!
      width: 300
    }, {
      Header: 'Email Address',
      accessor: 'emailId',    
      width: 400
    }, {
      Header: 'Contact Number',
      accessor: 'contactNumber', // Custom value accessors!
      width: 300,
      style: { textAlign: "center" }
    }, {
      Header: 'Status', // Custom header components!
      id: "status",
      accessor: d => d.status=='ACTIVE'? (<Badge color="success">Active</Badge>):(<Badge color="secondary">Inactive</Badge>),
      width: 150,
      style: { textAlign: "center" }
    },
    {
      Header: "Action",
      Cell: row => (<>
           <IconButton aria-label="Delete">
             <EditIcon fontSize="small" /> 
           </IconButton>
           <DeleteConfirmDialog deleteId={row.row._original._id} onClick={this.onClickToDelete}/>
        </>),
      style: { textAlign: "center" }
    }
  ]


    const {tableData} = this.state;
    
    return (
      <div>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users List
              </CardHeader>
                <CardBody>  
                  <Datatable data={tableData} columns={columns} onFetchData={this.onChangeToFetchTable} pages={this.state.pages} loading={this.state.loading}/>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(null, {getAllUser, deleteUser})(UsersModal);
