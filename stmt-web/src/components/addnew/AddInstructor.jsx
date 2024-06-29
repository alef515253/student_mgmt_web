import "../../pages/new/new.scss"

import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

export const AddInstructor = () => {
    const { instructorId } = useParams(); 
    const [selectedOptions, setSelectedOptions] = useState([]);
    const getTodayDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };
    const [instructor, setInstructor] = useState({
        name: '',
        email: '',
        organization: '',
        phoneNumber: '',
        designation: '',
        expertise: '',
        role: [],
        activeStartDate: getTodayDate(),
        activeEndDate: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [viewMode, setViewMode] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const fetchInstructor = async (id) => {
        try {
            const response = await axiosInstance.get(`/getInstructorById?id=${id}`);
            console.log(response.data.data)
            setInstructor(response.data.data); // Set course details from API response
            setSelectedOptions(response.data.data.role);
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    };
    useEffect(() => {
        if (instructorId) {
            const path = window.location.pathname;
            if(path.includes('edit-instructor')){
                setEditMode(true);
            }
            else if(path.includes('view-instructor')){
                setViewMode(true);
            }
            fetchInstructor(instructorId);
            // Set mode to edit if courseId is present
        } else {
            setEditMode(false); // Set mode to add if no courseId is present
            setViewMode(false);            
        }
    }, [instructorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInstructor({ ...instructor, [name]: value || ''});
        setErrors({ ...errors, [name]: '' });
    };

    const goBack = (e) => {
        navigate('/instructors');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!instructor.name || !instructor.name.trim()) {
            newErrors.name = 'instructor name is required';
        }
        if (!instructor.email || !instructor.email.trim()) {
            newErrors.email = 'instructor email is required';
        }
        if (!validateEmail(instructor.email)) {
            newErrors.email = 'Invalid email address.';
        }
        if (!instructor.organization || !instructor.organization.trim()) {
            newErrors.organization = 'instructor organization is required';
        }
        if (!instructor.activeStartDate) {
            newErrors.activeStartDate='Start date is required';
        }
        if (instructor.activeEndDate && instructor.activeStartDate && new Date(instructor.activeEndDate) <= new Date(instructor.activeStartDate)) {
            newErrors.activeEndDate='End date must be greater than start date';
        }
        if (instructor.role.length === 0 ) {
            newErrors.role='Select atleast 1 role';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(instructor);
        if (!validateForm()) return;
        console.log("inside submit");
        var response='';
        try {
            if(viewMode){
                navigate('/instructors');
            }
            else if (editMode) {
                // Update course if in edit mode
                response = await axiosInstance.put('/instructors', instructor,{showToastOnResponse: true});
            }
            else{
                response = await axiosInstance.post('/instructors', instructor,{showToastOnResponse: true});
            
            }
            console.log(response);
            navigate('/instructors');
            
        } catch (error) {
            console.log('Error saving instructor. Please try again later.');
            console.log(error);
        }
    };
    const handleSelectChange = (event) => {
        console.log(event.target.selectedOptions);
        const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(selectedValues);
        console.log(selectedValues);
        setInstructor(prevInstructor => ({
            ...prevInstructor,
            role: selectedValues
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
              <label>Instructor name</label>
              <input type="text" 
              name="name"
              value={instructor.name}
              onChange={handleChange}
              readOnly={viewMode}
              className={errors.name ? 'error' : ''}/>
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>
            <div className="formInput">
              <label>Email</label>
              <input type="text" 
              name="email"
              value={instructor.email}
              readOnly={viewMode}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}/>
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
            <div className="formInput">
              <label>Organization</label>
              <input type="text"
              name="organization"
              value={instructor.organization}
              readOnly={viewMode}
              onChange={handleChange}
              className={errors.organization ? 'error' : ''}/>
              {errors.organization && <div className="error-text">{errors.organization}</div>}
            </div>
            <div className="formInput">
              <label>Phone Number</label>
              <input type="text"
              name="phoneNumber"
              value={instructor.phoneNumber}
              readOnly={viewMode}
              onChange={handleChange}
              className={errors.phoneNumber ? 'error' : ''}/>
              {errors.phoneNumber && <div className="error-text">{errors.phoneNumber}</div>}
            </div>
            <div className="formInput">
              <label>Designation</label>
              <input type="text"
              name="designation"
              value={instructor.designation}
              readOnly={viewMode}
              onChange={handleChange}
              className={errors.designation ? 'error' : ''}/>
              {errors.designation && <div className="error-text">{errors.designation}</div>}
            </div>
            <div className="formInput">
              <label>Expertise</label>
              <input type="text"
              name="expertise"
              value={instructor.expertise}
              readOnly={viewMode}
              onChange={handleChange}
              className={errors.expertise ? 'error' : ''}/>
              {errors.expertise && <div className="error-text">{errors.expertise}</div>}
            </div>


            <div className="formInput">
            <label>Active Start Date</label>
            <input
                type="date"
                id="activeStartDate"
                name="activeStartDate"
                readOnly={viewMode}
                value={instructor.activeStartDate}
                onChange={handleChange}
            />
            {errors.activeStartDate && <div className="error-text">{errors.activeStartDate}</div>}
        </div>

        <div className="formInput">
            <label>Active End Date</label>
            <input
                type="date"
                id="activeEndDate"
                name="activeEndDate"
                readOnly={viewMode}
                value={instructor.activeEndDate}
                onChange={handleChange}
            />
            {errors.activeEndDate && <div className="error-text">{errors.activeEndDate}</div>}
        </div>

            <div className="formInput">
            <label>Role</label>
            <select id="styled-dropdown"  
            name="role"
            multiple
            value={selectedOptions}
            onChange={handleSelectChange}
            disabled={viewMode}
            className={errors.role ? 'error' : ''}>
                <option value="Teacher">Teacher</option>
                <option value="TA">TA</option>
                <option value="Examiner">Examiner</option>
                <option value="Mentor">Mentor</option>
                <option value="Other">Other</option>
            </select>
            {errors.role && <div className="error-text">{errors.role}</div>}
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


