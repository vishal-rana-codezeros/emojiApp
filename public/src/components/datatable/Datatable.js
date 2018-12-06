import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import PropTypes from 'prop-types'; 


const Datatable = ({data, columns, onFetchData, pages, loading, filterable, sortable}) => {
    return (
        <>
        <ReactTable
          columns={columns}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={(state, instance) => onFetchData(state, instance)} // Request new data when things change
          filterable={filterable}
          sortable={sortable}
          defaultPageSize={10}
          className="-striped -highlight"
          // show the loading overlay
            // this.setState({loading: true})
            // // fetch your data
            // Axios.post('mysite.com/data', {
            //   page: state.page,
            //   pageSize: state.pageSize,
            //   sorted: state.sorted,
            //   filtered: state.filtered
            // })
            //   .then((res) => {
            //     // Update react-table
            //     this.setState({
            //       data: res.data.rows,
            //       pages: res.data.pages,
            //       loading: false
            //     })
            //   })
        />
      </>
    );
  }

  Datatable.propTypes = {
    onFetchData: PropTypes.func.isRequired
  };

export default Datatable;
