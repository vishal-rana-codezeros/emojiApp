import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import PropTypes from 'prop-types'; 
import '../../index.css'
import { Badge } from 'reactstrap';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
// import JqxDataTable from 'jqwidgets-react/react_jqxdatatable.js';
 
import MUIDataTable from "mui-datatables";



const Datatablewithfilter = ({data, columns, pages, loading, filterable, sortable, filter,onFetchData}) => {
console.log("datatable with filter called",filter)
    return (
        <>
      
        <MUIDataTable
          filter={filter}
          columns={columns}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          onFetchData={(state, instance) => onFetchData(state, instance)}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need i
          filterable={filterable}//filterable
          sortable={sortable}
          defaultPageSize={10}
          className="-striped -highlight"
          
        />
      </>
    );
  }
  Datatablewithfilter.defaultProps={
    pages:1,
    columns:[{
      Header: 'Full Name',
      accessor: 'fullName', // String-based value accessors!
      width: 300
    }, {
      Header: 'Email Address',
      accessor: 'emailId',    
      width: 400
    }, {
      Header: 'Contact Number',
      accessor: 'contactNumber', // Custom value accessors!
      width: 300,
      style: { textAlign: "center" }
    }, {
      Header: 'Status', // Custom header components!
      id: "status",
      accessor: d => d.status=='ACTIVE'? (<Badge color="success">Active</Badge>):(<Badge color="secondary">Inactive</Badge>),
      width: 150,
      style: { textAlign: "center" }
    },
    {
      Header: "Action",
      Cell: row => (<>
           <IconButton aria-label="Delete">
             <EditIcon fontSize="small" /> 
           </IconButton>
           <DeleteConfirmDialog deleteId={row.row._original._id} onClick={this.onClickToDelete}/>
        </>),
      style: { textAlign: "center" }
    }
  ]
}

Datatablewithfilter.propTypes = {
    onFetchData: PropTypes.func.isRequired
  };

export default Datatablewithfilter;
