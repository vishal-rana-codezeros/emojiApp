import React, { Component } from 'react';
import ReactTable from "react-table";
import MUIDataTable from "mui-datatables";
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import '../../index.css'

const Datatable = ({ data, columns, onFetchData, pages }) => {
  // console.log("data=============>", data)
  const options = {
    serverSide: true,
    display: false,
    download: false,
    selectableRows: false,
    print:false,
    filter:false,
    viewColumns:false,
    onTableChange: (action, tableState) => {
      onFetchData(action, tableState)
    }
  };


  return (
    <MUIDataTable
      data={data}
      columns={["Full Name ", "Email Id","Contact Number","Status","Action"]}
      className="-striped -highlight"
      options={options}
    />
  );
}


Datatable.propTypes = {
  onFetchData: PropTypes.func.isRequired
};

export default Datatable;
