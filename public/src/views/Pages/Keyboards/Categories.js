import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getAllKeyboardDetails, deleteKeyboard, getOneKeyboardDetails, updateUser, activeKeyboard, getAllCategory } from '../../../action/user.action';
import Datatable from './KeyboardDatatable';
import DeleteKeyboard from '../../../components/Keyboard/DeleteKeyboard';
import EditUser from '../../../components/Keyboard/EditKeyboard';
import ViewKeyboard from '../../../components/Keyboard/ViewKeyboard';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ActiveConfirmDialog from '../../../components/Keyboard/ActiveKeyboard'
import Button from '@material-ui/core/Button';
import AddKeyboard from '../../../components/Keyboard/AddKeyboard';
import Spinner from '../../../Spinner/Spinner'

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

    this.onClickToDelete = this.onClickToDelete.bind(this);
    this.onClickToActive = this.onClickToActive.bind(this);

  }


  componentWillMount() {
    this.setState({ loading: true })
    this.getUser()
    this.setState({ loading: false })
  }

  getUser = () => {

   const{page,pageSize}=this.state;
    this.props.getAllKeyboardDetails(page, pageSize).then((res) => {
      if (res.status == 200) {
        const { total, docs } = res.data.data;

        let tableData = [];

        docs.map(x => tableData.push([x.keyboardName, x.category, x.keyboardType, x.cost, x.status,
        (<>
          <EditUser getUser={this.getUser.bind(this)} editId={x._id} />

          {x.status == 'ACTIVE' && <DeleteKeyboard deleteId={x._id} onClick={this.onClickToDelete} />}
          {x.status == 'ACTIVE' && <ViewKeyboard viewId={x._id} />}
          {x.status == 'INACTIVE' && < ActiveConfirmDialog activeId={x._id} onClick={(e) => { this.onClickToActive(x._id) }} />}
        </>)
        ]))

        this.setState({ tableData, count: total, page: page, pageSize: pageSize })
      }
    })
  }

  onClickToDelete = (id) => {
    this.props.deleteKeyboard(id).then((res) => {
      if (res.status == 200) {
        this.getUser()
      }
    })

  }
  onClickToActive = (id) => {
    this.props.activeKeyboard(id).then((res) => {
      if (res.status == 200) {
        this.getUser()
      }
    })

  }

  onChangeToFetchTable(action, tableState) {
    // this.getUser()
    console.log("in onChangeToFetchTable")
    let { page, rowsPerPage, searchText, pageSize } = tableState

    this.props.getAllKeyboardDetails(page, rowsPerPage, searchText ? searchText : "").then((res) => {

      if (res.data.code == 200) {
        const { total, docs, code } = res.data.data;

        console.log("data in table chang", docs)
        let tableData = [];
        docs.map(x => tableData.push([x.keyboardName, x.category, x.keyboardType, x.cost, x.status,
        (<>
          <EditUser getUser={this.getUser.bind(this)} editId={x._id} onClick={this.onClickToEdit} />

          {x.status == 'ACTIVE' && <DeleteKeyboard deleteId={x._id} onClick={this.onClickToDelete} />}
          {x.status == 'ACTIVE' && <ViewKeyboard viewId={x._id} />}
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
    if (this.state.loading) {
      return (<Spinner loading={this.state.loading}></Spinner>)
    }
    return (
      <div >
        <Row >
          <Col xs="12" lg="12">
            <Card className="tablecss" >
              <CardHeader className="tablecss" style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600' }}>
                Keyboards List
                {/* <style:"margin-left: 5672% !important"> */}
                <>
                  <AddKeyboard getUser={this.getUser.bind(this)} />
                </>
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

export default connect(null, { getAllKeyboardDetails, deleteKeyboard, getOneKeyboardDetails, updateUser, activeKeyboard, getAllCategory })(Categories);





















