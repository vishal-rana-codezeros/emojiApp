import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import PropTypes from 'prop-types'; 
import '../../index.css'

const Datatable = ({data, columns, onFetchData, pages, loading, filterable, sortable}) => {
  // console.log("filter in datatable",filter)
    return (
        <>
      
        <ReactTable
          // filter={filter}
          columns={columns}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={(state, instance) => onFetchData(state, instance)} // Request new data when things change
          filterable={filterable}//filterable
          sortable={sortable}
          defaultPageSize={10}
          className="-striped -highlight"
       
       
        />
      </>
    );
  }
  

  Datatable.propTypes = {
    onFetchData: PropTypes.func.isRequired
  };

export default Datatable;
