import React, { useEffect, useState } from 'react';
import { getAllTerms} from '../../services/termService';

import { Link } from "react-router-dom";
import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';

export const TermList=()=> {
    const [terms, setTerms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchTerms = async () => {
        try {
            const data = await getAllTerms();
            console.log(data);
            setTerms(data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {      

        fetchTerms();
    }, []);


    const columns = React.useMemo(
        () => [
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'startDate', headerName: 'Start Date', width: 150 },
            { field: 'endDate', headerName: 'End Date', width: 120 },
            { field: 'midSemDate', headerName: 'Mid Sem Date', width: 180 },
            { field: 'endSemDate', headerName: 'End Sem Date', width: 180 }
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
                    <div className="viewButton"><Link to={{pathname: `/terms/view-term/${id}`}} style={{textDecoration:"none"}}>View</Link></div>
                    <div className="editButton"><Link to={{pathname: `/terms/edit-term/${id}`}} style={{textDecoration:"none" }}>Edit</Link></div>
                </div>
            );
        }
    }]

    return (
        <div className="datatable" >
        <div className="datatableTitle">


          <Link to="/terms/new" className="link" >
          Add Term
          </Link>

        </div>
      
      <DataGrid 
      rows={terms}
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

