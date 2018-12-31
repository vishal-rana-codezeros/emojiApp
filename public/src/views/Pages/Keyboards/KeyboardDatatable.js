import React, { Component } from 'react';
import ReactTable from "react-table";
import MUIDataTable from "mui-datatables";
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import '../../../index.css'
import EditUser from '../../../components/Keyboard/EditKeyboard';
import DeleteKeyboard from '../../../components/Keyboard/DeleteKeyboard';
import ActiveConfirmDialog from '../../../components/Keyboard/ActiveKeyboard'
const KeyboardDatatable = () => {
  
  const options = {
    serverSide: true,
    display: false,
    download: false,
    selectableRows: false,
    print:false,
    filter:false,
    viewColumns:false,
    page:0,
    rowsPerPage:5,
    count:5,
    defaultPageSize:10,
    // onTableChange: (action, tableState) => {
      // onFetchData(action, tableState)
    // }
  };
 const  data = [
    ["keyboard1", "category1", "type1", "cost1","Active", <>< ActiveConfirmDialog/><EditUser/> <DeleteKeyboard /></>],
    ["keyboard2", "category2", "type2", "cost2","Active", <>< ActiveConfirmDialog/><EditUser/> <DeleteKeyboard /></>],
    ["keyboard3", "category3", "type3", "cost3","Active", <>< ActiveConfirmDialog/><EditUser/> <DeleteKeyboard /></>],
    ["keyboard4", "category4", "type4", "cost4","Active", <>< ActiveConfirmDialog/><EditUser/> <DeleteKeyboard /></>],
    ["keyboard5", "category5", "type5", "cost5","Active", <>< ActiveConfirmDialog/><EditUser/> <DeleteKeyboard /></>]
   ]
  // console.log("page,pageSize", page,pageSize);

  

  //         {x.status == 'ACTIVE' && <DeleteKeyboard deleteId={x._id} onClick={this.onClickToDelete} />}
  //         {x.status == 'INACTIVE' && < ActiveConfirmDialog activeId={x._id} onClick={(e) => { this.onClickToActive(x._id) }} />}

  return (
    <MUIDataTable
      data={data}
      columns={["Name ", "Category","Type","Cost","Status","Action"]}
      className="-striped -highlight"
      options={options}
      className="tablecss"
    />
  );
}


KeyboardDatatable.propTypes = {
  onFetchData: PropTypes.func.isRequired
};

export default KeyboardDatatable;