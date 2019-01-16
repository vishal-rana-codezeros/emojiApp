import React, { Component } from 'react';
import ReactTable from "react-table";
import MUIDataTable from "mui-datatables";
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import '../../../index.css'
import EditUser from '../../../components/Keyboard/EditKeyboard';
import DeleteKeyboard from '../../../components/Keyboard/DeleteKeyboard';
import ActiveConfirmDialog from '../../../components/Keyboard/ActiveKeyboard'
const CategoriesDatatable = ({ data, columns, onFetchData, page,pageSize,count})  => {
  
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
    responsive:"scroll",
    resizableColumns:false,
    onTableChange: (action, tableState) => {
      onFetchData(action, tableState)
    }
  };
  // console.log("page,pageSize", page,pageSize);

 return (
    <MUIDataTable
      data={data}
      columns={["Category","Status","Action"]}
      // className="-striped -highlight"
      options={options}
      className="tablecss"
    />
  );
}


CategoriesDatatable.propTypes = {
  onFetchData: PropTypes.func.isRequired
};

export default CategoriesDatatable;