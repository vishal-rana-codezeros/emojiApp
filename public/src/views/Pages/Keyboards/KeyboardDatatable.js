import React, { Component } from 'react';
import ReactTable from "react-table";
import MUIDataTable from "mui-datatables";
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import '../../../index.css'
import EditUser from '../../../components/Keyboard/EditKeyboard';
import DeleteKeyboard from '../../../components/Keyboard/DeleteKeyboard';
import ActiveConfirmDialog from '../../../components/Keyboard/ActiveKeyboard'
const KeyboardDatatable = ({ data, columns, onFetchData, page,pageSize,count})  => {
  
  const options = {
    serverSide: true,
    display: false,
    download: false,
    selectableRows: false,
    print:false,
    filter:false,
    viewColumns:false,
    page:page,
    rowsPerPage:pageSize,
    count:count,
    showResponsive:true,
    rowsPerPage:pageSize,
    // defaultPageSize:10,
    onTableChange: (action, tableState) => {
      onFetchData(action, tableState)
    }
  };
  // console.log("page,pageSize", page,pageSize);

 return (
    <MUIDataTable
      data={data}
      columns={["Name ", "Category","Type","Cost","Status","Action"]}
      // className="-striped -highlight"
      options={options}
      className="tablecss"
    />
  );
}


KeyboardDatatable.propTypes = {
  onFetchData: PropTypes.func.isRequired
};

export default KeyboardDatatable;