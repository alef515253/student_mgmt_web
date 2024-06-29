import React, { useEffect, useState } from 'react';
import { getAllCourses} from '../../services/courseService';

import { Link } from "react-router-dom";
import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';

export const CourseList=()=> {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCourses = async () => {
        try {
            const data = await getAllCourses();
            console.log(data);
            setCourses(data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {      

        fetchCourses();
    }, []);


    const columns = React.useMemo(
        () => [
            { field: 'courseName', headerName: 'Name', width: 150 },
            { field: 'description', headerName: 'Description', width: 150 },
            { field: 'term', headerName: 'Term', width: 120 },
            { field: 'type', headerName: 'Type', width: 180 }
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
                    <div className="viewButton"><Link to={{pathname: `/courses/view-course/${id}`}} style={{textDecoration:"none"}}>View</Link></div>
                    <div className="editButton"><Link to={{pathname: `/courses/edit-course/${id}`}} style={{textDecoration:"none" }}>Edit</Link></div>
                </div>
            );
        }
    }]

    return (
        <div className="datatable" >
        <div className="datatableTitle">


          <Link to="/courses/new" className="link" >
          Add Course
          </Link>

        </div>
      
      <DataGrid 
      rows={courses}
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

