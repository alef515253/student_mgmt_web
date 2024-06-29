import "../../pages/new/new.scss"

import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

export const AddCourse = () => {
    const { courseId } = useParams(); 
    const [course, setCourse] = useState({
        courseName: '',
        description: '',
        term: '',
        type: 'Optional',
        syllabus: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [viewMode, setViewMode] = useState(false);

    const fetchCourse = async (id) => {
        try {
            const response = await axiosInstance.get(`/getCourseById?id=${id}`);
            console.log(response.data.data)
            setCourse(response.data.data); // Set course details from API response
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };
    useEffect(() => {
        if (courseId) {
            const path = window.location.pathname;
            if(path.includes('edit-course')){
                setEditMode(true);
            }
            else if(path.includes('view-course')){
                setViewMode(true);
            }
            fetchCourse(courseId);
            // Set mode to edit if courseId is present
        } else {
            setEditMode(false); // Set mode to add if no courseId is present
            setViewMode(false);            
        }
    }, [courseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value || ''});
        setErrors({ ...errors, [name]: '' });
    };

    const goBack = (e) => {
        navigate('/courses');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!course.courseName || !course.courseName.trim()) {
            newErrors.courseName = 'Course name is required';
        }
        if (!course.description || !course.description.trim()) {
            newErrors.description = 'Course description is required';
        }
        if (!course.type || !course.type.trim()) {
            newErrors.type = 'Course type is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        console.log("inside submit");
        var response='';
        try {
            if(viewMode){
                navigate('/courses');
            }
            else if (editMode) {
                // Update course if in edit mode
                response = await axiosInstance.put('/courses', course,{showToastOnResponse: true});
            }
            else{
                response = await axiosInstance.post('/courses', course,{showToastOnResponse: true});
            
            }
            console.log(response);
            navigate('/courses');
            
        } catch (error) {
            console.log('Error saving course. Please try again later.');
            console.log(error);
        }
    };


    return (
        <div>
        <div className="top">
        <h1>{editMode? 'Edit Course' : viewMode? 'View Course': 'Add Course'}</h1>
      </div>
      <div className="bottom">
        <div className="left"></div>
        <div className="right">
        <form onSubmit={handleSubmit}>
           
            <div className="formInput">
              <label>Course name</label>
              <input type="text" 
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              readOnly={viewMode}
              className={errors.courseName ? 'error' : ''}/>
              {errors.courseName && <div className="error-text">{errors.courseName}</div>}
            </div>
            <div className="formInput">
              <label>Description</label>
              <input type="text" 
              name="description"
              value={course.description}
              readOnly={viewMode}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}/>
              {errors.description && <div className="error-text">{errors.description}</div>}
            </div>
            <div className="formInput">
              <label>Term</label>
              <input type="text"
              name="term"
              value={course.term}
              readOnly={viewMode}
              onChange={handleChange}
              className={errors.term ? 'error' : ''}/>
              {errors.term && <div className="error-text">{errors.term}</div>}
            </div>
            <div className="formInput">
              <label>Syllabus</label>
              <input type="text"
              name="syllabus"
              value={course.syllabus}
              readOnly={viewMode}
              onChange={handleChange}
              className={errors.syllabus ? 'error' : ''}/>
              {errors.syllabus && <div className="error-text">{errors.syllabus}</div>}
            </div>
            <div className="formInput">
            <label>Course type</label>
            <select id="styled-dropdown"  
            name="type"
            value={course.type}
            onChange={handleChange}
            disabled={viewMode}
            className={errors.type ? 'error' : ''}>
                <option value="Optional">Optional</option>
                <option value="Core">Core</option>
                <option value="Lab">Lab</option>
                <option value="Project">Project</option>
                <option value="Other">Other</option>
            </select>
            {errors.type && <div className="error-text">{errors.type}</div>}
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


