import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getAllUser, deleteUser, getOneUser,updateUser,activeUser} from '../../action/user.action';
import Datatable from '../../components/datatable/Datatable';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import EditUser from '../../components/common/EditUser';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';



class UsersModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [],
      page: 0,
      pageSize: 20,
      count: '',
      loading: false,
      filter: ''
    }

    this.onClickToDelete = this.onClickToDelete.bind(this);
    this.onClickToActive = this.onClickToActive.bind(this);
  }


  componentWillMount() {
    this.getUser()  
  }

  getUser = () => {
    const { page, pageSize } = this.state;
    this.props.getAllUser(page, pageSize).then((res) => {

      if (res.status == 200) {
        const { total, docs } = res.data.data;
        // console.log("docs", docs)
        let tableData = [];
        docs.map(x => tableData.push([x.fullName, x.emailId, x.contactNumber, x.status,
        (<>          
          <EditUser getUser={this.getUser.bind(this)} editId={x._id} />
          
          {x.status == 'ACTIVE' && <DeleteConfirmDialog deleteId={x._id} onClick={this.onClickToDelete} />}
          {x.status == 'INACTIVE' && <RemoveRedEyeIcon onClick={(e) => {this.onClickToActive(x._id)}} />}

        </>)
        ]))

        this.setState({ tableData: tableData, count: total })
      }
    })
  }

  onClickToDelete = (id) => {
    console.log("id", id)
    this.props.deleteUser(id).then((res) => {
      if (res.status == 200) {
        this.getUser()
      }
    })

  }
  onClickToActive = (id) => {
    console.log("activeid", id)
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
        // console.log("total, docs, code", total, docs, code);
        let tableData = [];
        docs.map(x => tableData.push([x.fullName, x.emailId, x.contactNumber, x.status,
        (<>
          <EditUser getUser={this.getUser.bind(this)} editId={x._id} onClick={this.onClickToEdit} />
          
          {x.status == 'ACTIVE' && <DeleteConfirmDialog deleteId={x._id} onClick={this.onClickToDelete} />}
          {x.status == 'INACTIVE' && <RemoveRedEyeIcon onClick={(e) => {this.onClickToActive(x._id)}} />} 
        </>)
        ]))

        this.setState({ tableData, count: total })
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
                <Datatable data={this.state.tableData} onFetchData={this.onChangeToFetchTable.bind(this)} pages={this.state.pages} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(null, { getAllUser, deleteUser, getOneUser,updateUser,activeUser})(UsersModal);
