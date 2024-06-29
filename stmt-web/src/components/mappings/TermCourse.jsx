import React, { useEffect, useState } from 'react';
import { Navbar } from "../navbar/Navbar"
import { Sidebar } from "../sidebar/Sidebar"
import "./mappings.scss"
import "../datatable/datatable.scss"
import { getAllTerms } from '../../services/termService';
import axiosInstance from '../../api/axios';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { getNoTermCourses, addTermCourses,getAllTermCourses } from '../../services/termCourseService';
import { getInstructors, getTAs } from '../../services/instructorService';
export const TermCourse = () => {
    const [newErrors, setNewErrors] = useState({});
    const [options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const [newcourses, setNewCourses] = useState([]);
    const [selectedcourseId, setSelectedCourseId] = useState(null);

    const [instructors, setInstructors] = useState([]);
    const [selectedInstructorId, setSelectedInstructorId] = useState([]);

    const [tas, setTAs] = useState([]);
    const [selectedTAId, setSelectedTAId] = useState([]);

    const [tableData, setTableData] = useState([]);

    const fetchTerms = async () => {
        try {
            const data = await getAllTerms();
            console.log(data);
            setOptions(data.data);
        } catch (err) {

        }
    };
    useEffect(() => {
        fetchTerms();
    }, []);

    const fetchTermCourse = async (id) => {
        try {
            const response = await getAllTermCourses(id);
            console.log(response.data)
            setTableData(response.data); // Set course details from API response
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };

    const fetchNewCourseList = async (id) => {
        try {
            setSelectedCourseId(null);
            setSelectedInstructorId([]);
            setSelectedTAId([]);
            const response = await getNoTermCourses(id);
            console.log(response.data)
            setNewCourses(response.data); // Set course details from API response
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };

    const fetchInstructorList = async () => {
        try {
            const response = await getInstructors();
            console.log(response.data)
            setInstructors(response.data); // Set course details from API response
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };

    const fetchTAList = async () => {
        try {
            const response = await getTAs();
            console.log(response.data)
            setTAs(response.data); // Set course details from API response
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };
    useEffect(() => {
        if (selectedId) {
            // Fetch table data based on selectedId
            fetchTermCourse(selectedId);
            fetchNewCourseList(selectedId);

        }
        else{
            setTableData([]);
        }
    }, [selectedId]);

    const handleSelect = (event) => {
        setSelectedId(event.target.value);
    };

    const handleAddCourseSelect = (event) => {
        setSelectedCourseId(event.target.value);
        fetchInstructorList();
        fetchTAList();
    };

    const handleAddInstructorSelect = (event) => {        
        const selectedValues = Array.from(event.target.selectedOptions , option => option.value);
        setSelectedInstructorId(selectedValues);
    };
   
    const handleAddTASelect = (event) => {        
        const selectedValues = Array.from(event.target.selectedOptions , option => option.value);
        setSelectedTAId(selectedValues);       
    };

    const columns = React.useMemo(
        () => [
            { field: 'course_name', headerName: 'Course Name', width: 150 },
            { field: 'instructor_names', headerName: 'Instructors', width: 150 },
            { field: 'ta_names', headerName: 'TAs', width: 120 }
        ],
        []
    );
    const actionColumn = [{
        field: "action", headerName: "Action", width: 200,
        renderCell: (params) => {
            const { id } = params.row;
            return (
                <div className="cellAction">
                    <div className="viewButton"><Link to={{ pathname: `/termcourses/view-termcourse/${id}` }} style={{ textDecoration: "none" }}>View</Link></div>
                    <div className="editButton"><Link to={{ pathname: `/termcourses/edit-termcourse/${id}` }} style={{ textDecoration: "none" }}>Edit</Link></div>
                </div>
            );
        }
    }]

    const validateForm = () => {
        const newErrors = {};
        if (!selectedcourseId) {
            newErrors.name = 'Please select course';
        }

        setNewErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        try {

            const termCourseData = {
                "termId": selectedId,
                "courseId": selectedcourseId,
                "instructorIds": selectedInstructorId,
                "taIds": selectedTAId,
            }
            const response = await addTermCourses(termCourseData);
            console.log(response);
            fetchTermCourse(selectedId);


        } catch (error) {
            console.log('Error saving termCourse. Please try again later.');
            console.log(error);
        }
    }

    return (
        <div className="mapping">
            <Sidebar />
            <div className="mappingContainer">
                <Navbar />
                <div>
                    <div className="top">
                        <h1>Term Course Mapping</h1>
                    </div>
                    <div className="bottom">
                        <div className="left"></div>
                        <div className="right">

                            <div className="formInput">
                                <label>Select Term</label>
                                <select onChange={handleSelect}>
                                    <option value="">Select a course</option>
                                    {options.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                {<div className="error-text">{ }</div>}
                            </div>

                            <div className="datatable" >

                                <DataGrid
                                    rows={tableData}
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

                            {selectedId && <div className='addnew'>
                                <form onSubmit={handleSubmit}>
                                    <div className="formInput">
                                        <label>Add New Course</label>
                                        <select onChange={handleAddCourseSelect}>
                                            <option value="">Select an option</option>
                                            {newcourses && newcourses.map(option => (
                                                <option key={option.id} value={option.id}>
                                                    {option.courseName}
                                                </option>
                                            ))}
                                        </select>
                                        {newErrors.name && <div className="error-text">{newErrors.name}</div>}
                                    </div>
                                    {selectedcourseId &&
                                        <div className="formInput">
                                            <label>Select Instructors</label>
                                            <select id="styled-dropdown"
                                                name="instructor"
                                                multiple
                                                value={selectedInstructorId}
                                                onChange={handleAddInstructorSelect}
                                            >

                                                {instructors && instructors.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    }
                                    {selectedcourseId && <div className="formInput">
                                        <label>Select TAs</label>
                                        <select id="styled-dropdown2"
                                            name="ta"
                                            multiple
                                            value={selectedTAId}
                                            onChange={handleAddTASelect}
                                        >

                                            {tas && tas.map(option => (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>

                                    </div>





                                    }
                                    <div className="buttons">
                                        <button type="submit">Add Course to Term</button>

                                    </div>

                                </form>



                            </div>}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}


