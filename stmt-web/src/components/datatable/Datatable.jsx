import { Link } from "react-router-dom";
import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
//import axios from 'axios';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';



export const Datatable = ( { type, data, columnsConfig, showImport ,reload } ) => {

    const actionColumn = [{ field: "action", headerName:"Action", width:200,
        renderCell:()=>{
            return(
                <div className="cellAction">
                    <div className="viewButton">View</div>
                    <div className="editButton">Edit</div>
                </div>
            );
        }
    }]

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(null);
        const selectedFile = event.target.files[0];
        const maxFileSize = 10 * 1024 * 1024; // 10 MB
        const allowedTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
          'application/vnd.ms-excel', // .xls
          'text/csv' // .csv
        ];

        if (selectedFile.size > maxFileSize) {
          toast.error('File size exceeds 10 MB limit');
          return;
        }

        if (!allowedTypes.includes(selectedFile.type)) {
          toast.error('Only Excel (.xlsx, .xls) and CSV (.csv) files are allowed');
          return;
        }
        setFile(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosInstance.post('http://localhost:8089/stmmgmt/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                showToastOnResponse: true
            });

            console.log(response.data); 
            reload();// Handle success response
        } catch (error) {
            console.error('Error uploading file:', error); // Handle error response
        }
    };

  return (
    <div className="datatable" >
          <div className="datatableTitle">
          {showImport && <div className="import">
            Import Students
           <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Upload File</button>
            </form>

           </div>}

            <Link to="/students/new" className="link" >
            Add {type}
            </Link>

          </div>
        
        <DataGrid 
        rows={data}
        columns={columnsConfig.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        //checkboxSelection
      />
    </div>
  )
}
