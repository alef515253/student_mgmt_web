import "../../pages/new/new.scss"

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box } from '@mui/material';

export const AddStudent = () => {
    const [student, setStudent] = useState({ name: '', age: '', course: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = () => {
        // Add student save logic here (e.g., API call)
        navigate('/');
    };

    return (
        <form>
            <div className="formInput">
              <label>StudentName</label>
              <input type="text" placeholder="john"/>
            </div>
            <div className="formInput">
              <label>StudentName</label>
              <input type="text" placeholder="john"/>
            </div>
            <div className="formInput">
              <label>StudentName</label>
              <input type="email" placeholder="john"/>
            </div>
            <div className="formInput">
              <label>StudentName</label>
              <input type="text" placeholder="john"/>
            </div>
            <div className="formInput">
              <label>StudentName</label>
              <input type="password" placeholder="john"/>
            </div>
            <div className="formInput">
              <label>StudentName</label>
              <input type="password" placeholder="john"/>
            </div>
            <div className="formInput">
              <label>StudentName</label>
              <input type="password" placeholder="john"/>
            </div>
            <button>Save</button>
          </form>
    );
};


