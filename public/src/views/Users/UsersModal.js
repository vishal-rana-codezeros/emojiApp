import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getAllUser, deleteUser, getOneUser, updateUser, activeUser } from '../../action/user.action';
import Datatable from '../../components/datatable/Datatable';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import EditUser from '../../components/common/EditUser';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import ActiveConfirmDialog from '../../components/common/ActiveConfirmDialog'
import { LoaderAction } from '../../../src/action/loader.action';

class UsersModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [],
      page: 0,
      pageSize: 10,
      count: '',
      filter: ''
    }

    this.onClickToDelete = this.onClickToDelete.bind(this);
    this.onClickToActive = this.onClickToActive.bind(this);
  }


  componentDidMount() {
    
    this.props.LoaderAction(false)
    this.getUser()
  }

  getUser = () => {
    const { page, pageSize } = this.state;
    this.props.getAllUser(page, pageSize).then((res) => {
      
      if (res.status == 200) {
        const { total, docs } = res.data.data;
        
        let tableData = [];
        docs.map(x => tableData.push([x.fullName, x.emailId, x.userName, x.contactNumber, x.status,
        (<>
          <EditUser getUser={this.getUser.bind(this)} editId={x._id} />

          {x.status == 'ACTIVE' && <DeleteConfirmDialog deleteId={x._id} onClick={this.onClickToDelete} />}
          {x.status == 'INACTIVE' && < ActiveConfirmDialog activeId={x._id} onClick={(e) => { this.onClickToActive(x._id) }} />}
       
        </>)
        ]))
        this.setState({ tableData, count: total, page: page, pageSize: pageSize})
      }
      else if(res.data.code==400){
        this.props.logout();
      }
    })
  }

  onClickToDelete = (id) => {
    this.props.LoaderAction(true)
    this.props.deleteUser(id).then((res) => {
      if (res.status == 200) {
        this.getUser()
      }
    })

  }
  onClickToActive = (id) => {
    this.props.activeUser(id).then((res) => {
      if (res.status == 200) {
        this.getUser()
      }
    })

  }
  onChangeToFetchTable(action, tableState) {
    let { page, rowsPerPage, searchText } = tableState

    this.props.getAllUser(page, rowsPerPage, searchText ? searchText : "").then((res) => {

      if (res.data.code == 200) {
        const { total, docs, code } = res.data.data;
        let tableData = [];
        docs.map(x => tableData.push([x.fullName, x.emailId, x.userName, x.contactNumber, x.status,
        (<>
          <EditUser getUser={this.getUser.bind(this)} editId={x._id} onClick={this.onClickToEdit} />

          {x.status == 'ACTIVE' && <DeleteConfirmDialog deleteId={x._id} onClick={this.onClickToDelete} />}
          {x.status == 'INACTIVE' && <ActiveConfirmDialog activeId={x._id} onClick={(e) => { this.onClickToActive(x._id) }} />}
        </>)
        ]))

        this.setState({ tableData, count: total, page: page, pageSize: rowsPerPage })
      } else {
        this.setState({ tableData: [] })
      }
    })
  }
  render() {

    return (
      <div >
        <Row >
          <Col xs="12" lg="12">
            <Card className="tablecss" >
              <CardHeader className="tablecss" style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600' }}>
                Users List
              </CardHeader>

              <CardBody>
                <Datatable data={this.state.tableData} onFetchData={this.onChangeToFetchTable.bind(this)} page={this.state.page} pageSize={this.state.pageSize} count={this.state.count} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(null, { getAllUser, deleteUser, getOneUser, updateUser, activeUser,LoaderAction })(UsersModal);
