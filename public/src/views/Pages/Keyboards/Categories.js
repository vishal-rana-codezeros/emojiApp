import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getAllUser, deleteUser, getOneUser, updateUser, activeUser } from '../../../action/user.action';
import Datatable from './KeyboardDatatable';
import DeleteKeyboard from '../../../components/Keyboard/DeleteKeyboard';
import EditUser from '../../../components/Keyboard/EditKeyboard';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ActiveConfirmDialog from '../../../components/Keyboard/ActiveKeyboard'
import Button from '@material-ui/core/Button';


class Categories extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tableData: [],
      page: 0,
      pageSize: 10,
      count: '',
      loading: false,
      filter: ''
    }

    // this.onClickToDelete = this.onClickToDelete.bind(this);
    // this.onClickToActive = this.onClickToActive.bind(this);
  }


  componentWillMount() {
    // this.getUser()
  }

  // getUser = () => {

  //   const { page, pageSize } = this.state;
  //   this.props.getAllUser(page, pageSize).then((res) => {
  //     if (res.status == 200) {
  //       const { total, docs } = res.data.data;
  //       console.log("docs in users", docs)
  //       let tableData = [];
  //       docs.map(x => tableData.push([x.fullName, x.emailId, x.userName, x.contactNumber, x.status,
  //       (<>
  //         <EditUser getUser={this.getUser.bind(this)} editId={x._id} />

  //         {x.status == 'ACTIVE' && <DeleteKeyboard deleteId={x._id} onClick={this.onClickToDelete} />}
  //         {x.status == 'INACTIVE' && < ActiveConfirmDialog activeId={x._id} onClick={(e) => { this.onClickToActive(x._id) }} />}
  //       </>)
  //       ]))

  //       this.setState({ tableData, count: total, page: page, pageSize: pageSize })
  //     }
  //   })
  // }

  // onClickToDelete = (id) => {
  //   this.props.deleteUser(id).then((res) => {
  //     if (res.status == 200) {
  //       // this.getUser()
  //     }
  //   })

  // }
  // onClickToActive = (id) => {
  //   this.props.activeUser(id).then((res) => {
  //     if (res.status == 200) {
  //       // this.getUser()
  //     }
  //   })

  // }
  // onChangeToFetchTable(action, tableState) {
  //   let { page, rowsPerPage, searchText } = tableState

  //   this.props.getAllUser(page, rowsPerPage, searchText ? searchText : "").then((res) => {

  //     if (res.data.code == 200) {
  //       const { total, docs, code } = res.data.data;
  //       let tableData = [];
  //       docs.map(x => tableData.push([x.fullName, x.emailId, x.userName, x.contactNumber, x.status,
  //       (<>
  //         <EditUser getUser={this.getUser.bind(this)} editId={x._id} onClick={this.onClickToEdit} />

  //         {x.status == 'ACTIVE' && <DeleteKeyboard deleteId={x._id} onClick={this.onClickToDelete} />}
  //         {x.status == 'INACTIVE' && <ActiveConfirmDialog activeId={x._id} onClick={(e) => { this.onClickToActive(x._id) }} />}
  //       </>)
  //       ]))

  //       this.setState({ tableData, count: total, page: page, pageSize: rowsPerPage })
  //     } else {
  //       this.setState({ tableData: [] })
  //     }
  //   })
  // }
  render() {

    return (
      <div >
        <Row >
          <Col xs="12" lg="12">
            <Card className="tablecss" >
              <CardHeader className="tablecss" style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600' }}>
                Keyboards List 
                <Button color="primary" style={{position: 'relative', left: '42%'}}>
                    Add New
                </Button>
              </CardHeader>
              {/* <CardHeader className="tablecss" style={{ textAlign: 'left', fontSize: '20px', fontWeight: '600' }}>
              <button style="margin-left:30px;">Add</button>
              </CardHeader> */}
              {/* <div> <button style="margin-left:30px;">Add</button></div> */}
              <CardBody>
                <Datatable/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(null, { getAllUser, deleteUser, getOneUser, updateUser, activeUser })(Categories);




















// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {withStyles} from '@material-ui/core'

// const styles={
//   root:{
//     marginLeft:'70px'
//   }
  
// }
// class Categories extends Component {
//   loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

//   render() {

//     return (
//       <div className="animated fadeIn ">
//        Coming Soon
//       </div>
//     );
//   }
// }

// export default  connect(null) (withStyles(styles)(Categories));

