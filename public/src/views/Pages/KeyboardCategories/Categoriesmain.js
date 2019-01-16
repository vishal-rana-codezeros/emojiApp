import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getAllCategory, deleteCategory, getOneCategoryData, updateUser, activeCategory} from '../../../action/user.action';
import Datatable from './CategoriesDatatable';
import DeleteCategory from '../../../components/Categories/DeleteCategory';
import EditUser from '../../../components/Categories/UpdateCategory';
import ViewKeyboard from '../../../components/Categories/ViewCategory';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ActiveConfirmDialog from '../../../components/Categories/Activecategory'
import Button from '@material-ui/core/Button';
import AddCategory from '../../../components/Categories/AddCategory';
import Spinner from '../../../Spinner/Spinner'
class Categoriesmain extends Component {
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
    this.props.getAllCategory(page, pageSize).then((res) => {
      if (res.status == 200) {
        const { total, docs } = res.data.data;

        let tableData = [];

        docs.map(x => tableData.push([ x.categoryName, x.status,
        (<>
          <EditUser getUser={this.getUser.bind(this)} editId={x._id} />

          {x.status == 'ACTIVE' && <DeleteCategory deleteId={x._id} onClick={this.onClickToDelete} />}
          {x.status == 'ACTIVE' && <ViewKeyboard viewId={x._id} />}
          {x.status == 'INACTIVE' && < ActiveConfirmDialog activeId={x._id} onClick={(e) => { this.onClickToActive(x._id) }} />}
        </>)
        ]))

        this.setState({ tableData, count: total, page: page, pageSize: pageSize })
      }
    })
  }

  onClickToDelete = (id) => {
    this.props.deleteCategory(id).then((res) => {
      if (res.status == 200) {
        this.getUser()
      }
    })

  }
  onClickToActive = (id) => {
    this.props.activeCategory(id).then((res) => {
      if (res.status == 200) {
        this.getUser()
      }
    })

  }

  onChangeToFetchTable(action, tableState) {
    // this.getUser()
    console.log("in onChangeToFetchTable")
    let { page, rowsPerPage, searchText, pageSize } = tableState
    // return false;
    this.props.getAllCategory(page, rowsPerPage, searchText ? searchText : "").then((res) => {

      if (res.data.code == 200) {
        const { total, docs, code } = res.data.data;

        console.log("data in table chang", docs)
        let tableData = [];
        docs.map(x => tableData.push([ x.categoryName, x.status,
        (<>
          <EditUser getUser={this.getUser.bind(this)} editId={x._id} onClick={this.onClickToEdit} />

          {x.status == 'ACTIVE' && <DeleteCategory deleteId={x._id} onClick={this.onClickToDelete} />}
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
              Categories List
                <>
                  <AddCategory getUser={this.getUser.bind(this)} />
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

export default connect(null, { getAllCategory, deleteCategory, getOneCategoryData, updateUser, activeCategory, getAllCategory })(Categoriesmain);





















