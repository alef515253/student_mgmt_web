import "../../pages/new/new.scss"

import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';

export const AddTerm = () => {
    const { termId } = useParams(); 
    
    const [term, setTerm] = useState({
        name: '',
        startDate: '',
        endDate: '',
        midSemDate: '',
        endSemDate: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [viewMode, setViewMode] = useState(false);


    const fetchTerm = async (id) => {
        try {
            const response = await axiosInstance.get(`/getTermById?id=${id}`);
            console.log(response.data.data)
            setTerm(response.data.data);
            
        } catch (error) {
            console.error('Error fetching instructor:', error);
        }
    };
    useEffect(() => {
        if (termId) {
            const path = window.location.pathname;
            if(path.includes('edit-term')){
                setEditMode(true);
            }
            else if(path.includes('view-term')){
                setViewMode(true);
            }
            fetchTerm(termId);
            // Set mode to edit if courseId is present
        } else {
            setEditMode(false); // Set mode to add if no courseId is present
            setViewMode(false);            
        }
    }, [termId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTerm({ ...term, [name]: value || ''});
        setErrors({ ...errors, [name]: '' });
    };

    const goBack = (e) => {
        navigate('/terms');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!term.name || !term.name.trim()) {
            newErrors.name = 'term name is required';
        }
        if (!term.startDate || !term.startDate.trim()) {
            newErrors.startDate = 'term start date is required';
        }
        if (!term.endDate || !term.endDate.trim()) {
            newErrors.endDate = 'term end date is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(term);
        if (!validateForm()) return;
        console.log("inside submit");
        var response='';
        try {
            if(viewMode){
                navigate('/terms');
            }
            else if (editMode) {
                // Update course if in edit mode
                response = await axiosInstance.put('/terms', term,{showToastOnResponse: true});
            }
            else{
                response = await axiosInstance.post('/terms', term,{showToastOnResponse: true});
            
            }
            console.log(response);
            navigate('/terms');
            
        } catch (error) {
            console.log('Error saving term. Please try again later.');
            console.log(error);
        }
    };

    return (
        <div>
        <div className="top">
        <h1>{editMode? 'Edit term' : viewMode? 'View term': 'Add term'}</h1>
      </div>
      <div className="bottom">
        <div className="left"></div>
        <div className="right">
        <form onSubmit={handleSubmit}>
           
            <div className="formInput">
              <label>Term name</label>
              <input type="text" 
              name="name"
              value={term.name}
              onChange={handleChange}
              readOnly={viewMode}
              className={errors.name ? 'error' : ''}/>
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>          


            <div className="formInput">
            <label>Term Start Date</label>
            <input
                type="date"
                id="startDate"
                name="startDate"
                readOnly={viewMode}
                value={term.startDate}
                onChange={handleChange}
            />
            {errors.startDate && <div className="error-text">{errors.startDate}</div>}
        </div>

        <div className="formInput">
            <label>Term End Date</label>
            <input
                type="date"
                id="endDate"
                name="endDate"
                readOnly={viewMode}
                value={term.endDate}
                onChange={handleChange}
            />
            {errors.endDate && <div className="error-text">{errors.endDate}</div>}
        </div>

        <div className="formInput">
            <label>Mid Sem Date</label>
            <input
                type="date"
                id="midSemDate"
                name="midSemDate"
                readOnly={viewMode}
                value={term.midSemDate}
                onChange={handleChange}
            />
            {errors.midSemDate && <div className="error-text">{errors.midSemDate}</div>}
        </div>

        <div className="formInput">
            <label>End Sem Date</label>
            <input
                type="date"
                id="endSemDate"
                name="endSemDate"
                readOnly={viewMode}
                value={term.endSemDate}
                onChange={handleChange}
            />
            {errors.endSemDate && <div className="error-text">{errors.endSemDate}</div>}
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


