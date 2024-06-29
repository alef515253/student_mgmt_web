import React, { useEffect, useState } from 'react';
import { getAllInstructors} from '../../services/instructorService';

import { Link } from "react-router-dom";
import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';

export const InstructorList=()=> {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchInstructors = async () => {
        try {
            const data = await getAllInstructors();
            console.log(data);
            setInstructors(data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {      

        fetchInstructors();
    }, []);


    const columns = React.useMemo(
        () => [
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'email', headerName: 'Email', width: 150 },
            { field: 'role', headerName: 'Role', width: 120 },
            { field: 'designation', headerName: 'Designation', width: 180 },
            { field: 'expertise', headerName: 'Expertise', width: 180 }
        ],
        []
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const actionColumn = [{ field: "action", headerName:"Action", width:200,
        renderCell:(params)=>{
            const { id } = params.row;
            return(
                <div className="cellAction">
                    <div className="viewButton"><Link to={{pathname: `/instructors/view-instructor/${id}`}} style={{textDecoration:"none"}}>View</Link></div>
                    <div className="editButton"><Link to={{pathname: `/instructors/edit-instructor/${id}`}} style={{textDecoration:"none" }}>Edit</Link></div>
                </div>
            );
        }
    }]

    return (
        <div className="datatable" >
        <div className="datatableTitle">


          <Link to="/instructors/new" className="link" >
          Add Instructor
          </Link>

        </div>
      
      <DataGrid 
      rows={instructors}
      columns={columns.concat(actionColumn)}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[5, 10]}
      //checkboxSelection
    />
  </div>
    );
}

