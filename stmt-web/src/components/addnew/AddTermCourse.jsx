import "../../pages/new/new.scss"

import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

import { getTermCourseById ,updateTermCourses} from '../../services/termCourseService';

import { getInstructors, getTAs } from '../../services/instructorService';
export const AddTermCourse = () => {
    const { termCourseId } = useParams(); 
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const [termCourse, setTermCourse] = useState({
        termName:'',
        courseName: '',
        instructorIds: '',
        taIds: ''
       
    });
    
    const [selectedInstructorOptions, setSelectedInstructorOptions] = useState([]);
    const [selectedTAOptions, setSelectedTAOptions] = useState([]);

    const [instructors, setInstructors] = useState([]);
    const [tas, setTAs] = useState([]);

    const fetchTermCourse = async (id) => {
        try {
            const response = await getTermCourseById(id);
            console.log(response.data)
            setTermCourse(response.data); // Set course details from API response
            setSelectedInstructorOptions(response.data.instructorIds);
            setSelectedTAOptions(response.data.taIds);
        } catch (error) {
            console.error('Error fetching termCourse:', error);
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
        if (termCourseId) {
            const path = window.location.pathname;
            if(path.includes('edit-termcourse')){
                setEditMode(true);
            }
            else if(path.includes('view-termcourse')){
                setViewMode(true);
            }
            fetchTermCourse(termCourseId);
            fetchInstructorList();
            fetchTAList();
            // Set mode to edit if courseId is present
        } else {
            setEditMode(false); // Set mode to add if no courseId is present
            setViewMode(false);            
        }
    }, [termCourseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTermCourse({ ...termCourse, [name]: value || ''});
        setErrors({ ...errors, [name]: '' });
    };

    const goBack = (e) => {
        navigate('/termcourses');
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if(viewMode){
                navigate('/termcourses');
            }
            else if (editMode) {
                // Update course if in edit mode
                console.log(termCourse);
                var updateTermCourse={
                    id:termCourse.termCourseId,
                    instructorIds:termCourse.instructorIds,
                    taIds:termCourse.taIds

                }
                console.log(updateTermCourse);
                const response = await updateTermCourses(updateTermCourse);
                console.log(response);
            }
           /* else{
                response = await axiosInstance.post('/termcourses', instructor,{showToastOnResponse: true});
            
            }*/
            
            navigate('/termcourses');
            
        } catch (error) {
            console.log('Error saving termcourse. Please try again later.');
            console.log(error);
        }
    };
    const handleSelectInstructorChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedInstructorOptions(selectedValues);
        setTermCourse(termCourse => ({
            ...termCourse,
            instructorIds: selectedValues
        }));
    };

    const handleSelectTAChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedTAOptions(selectedValues);
        setTermCourse(termCourse => ({
            ...termCourse,
            taIds: selectedValues
        }));
    };

    return (
        <div>
        <div className="top">
        <h1>{editMode? 'Edit instructor' : viewMode? 'View instructor': 'Add instructor'}</h1>
      </div>
      <div className="bottom">
        <div className="left"></div>
        <div className="right">
        <form onSubmit={handleSubmit}>
           
            <div className="formInput">
              <label>Term name</label>
              <input type="text" 
              name="name"
              value={termCourse.termName}
              onChange={handleChange}
              readOnly={viewMode || editMode}
              className={errors.termName ? 'error' : ''}/>
              {errors.termName && <div className="error-text">{errors.termName}</div>}
            </div>

            <div className="formInput">
              <label>Course Name</label>
              <input type="text"
              name="courseName"
              value={termCourse.courseName}
              readOnly={viewMode || editMode}
              onChange={handleChange}
              className={errors.courseName ? 'error' : ''}/>
              {errors.courseName && <div className="error-text">{errors.courseName}</div>}
            </div>
            
            <div className="formInput">
            <label>Instructors</label>
            <select id="styled-dropdown"  
            name="instructors"
            multiple
            value={selectedInstructorOptions}
            onChange={handleSelectInstructorChange}
            disabled={viewMode}
            className={errors.instructors ? 'error' : ''}>
                {instructors && instructors.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
            </select>
            {errors.instructors && <div className="error-text">{errors.instructors}</div>}
        </div>

        <div className="formInput">
            <label>TAs</label>
            <select id="styled-dropdown"  
            name="tas"
            multiple
            value={selectedTAOptions}
            onChange={handleSelectTAChange}
            disabled={viewMode}
            className={errors.tas ? 'error' : ''}>
                {tas && tas.map(option => (
                                                <option key={option.id} value={option.id}>
                                                    {option.name}
                                                </option>
                                            ))}
            </select>
            {errors.tas && <div className="error-text">{errors.tas}</div>}
        </div>


        

        <div className="buttons">
           {!viewMode && <button type="submit">{editMode ? 'Update' : 'Save'}</button>}
           <button onClick={goBack}>Back</button>
           </div>
           </form>
          </div>
          </div>
          </div>
    );
};


