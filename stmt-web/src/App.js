import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import {TermCourse} from "./components/mappings/TermCourse";

import PrivateRoute from './PrivateRoute';
import { AuthProvider, useAuth } from './AuthProvider';
import axiosInstance from './api/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {   
    
  }, []);




  return (
    <div className="App">
       <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />}>
                    
        </Route>

          <Route  path="/"  >
            <Route  index element={<PrivateRoute role="ROLE_USER"><Home/></PrivateRoute>}/> 
            <Route  path="students">
              <Route  index element={<PrivateRoute role="ROLE_USER"><List type="student"/></PrivateRoute>}/>
              <Route  path=":studentId" element={<PrivateRoute role="ROLE_USER"><Single/></PrivateRoute>}/>
              <Route  path="new" element={<PrivateRoute role="ROLE_USER"><New  type="student"/></PrivateRoute>}/>
            </Route >
            <Route  path="courses" >
              <Route  index element={<PrivateRoute role="ROLE_USER"><List type="course"/></PrivateRoute>}/>
              <Route  path="view-course/:courseId" element={<PrivateRoute role="ROLE_USER"><New type="course"/></PrivateRoute>}/>
              <Route  path="edit-course/:courseId" element={<PrivateRoute role="ROLE_USER"><New type="course"/></PrivateRoute>}/>
              <Route  path="new" element={<PrivateRoute role="ROLE_USER"><New type="course"/></PrivateRoute>}/>
            </Route >
            <Route  path="instructors" >
              <Route  index element={<PrivateRoute role="ROLE_USER"><List type="instructor"/></PrivateRoute>}/>
              <Route  path="view-instructor/:instructorId" element={<PrivateRoute role="ROLE_USER"><New type="instructor"/></PrivateRoute>}/>
              <Route  path="edit-instructor/:instructorId" element={<PrivateRoute role="ROLE_USER"><New type="instructor"/></PrivateRoute>}/>
              <Route  path="new" element={<PrivateRoute role="ROLE_USER"><New type="instructor"/></PrivateRoute>}/>
            </Route >
            <Route  path="terms" >
              <Route  index element={<PrivateRoute role="ROLE_USER"><List type="term"/></PrivateRoute>}/>
              <Route  path="view-term/:termId" element={<PrivateRoute role="ROLE_USER"><New type="term"/></PrivateRoute>}/>
              <Route  path="edit-term/:termId" element={<PrivateRoute role="ROLE_USER"><New type="term"/></PrivateRoute>}/>
              <Route  path="new" element={<PrivateRoute role="ROLE_USER"><New type="term"/></PrivateRoute>}/>
            </Route >

            <Route  path="termcourses" >
              <Route  index element={<PrivateRoute role="ROLE_USER"><TermCourse /></PrivateRoute>}/>
              <Route  path="view-termcourse/:termCourseId" element={<PrivateRoute role="ROLE_USER"><New type="termCourse"/></PrivateRoute>}/>
              <Route  path="edit-termcourse/:termCourseId" element={<PrivateRoute role="ROLE_USER"><New type="termCourse"/></PrivateRoute>}/>
              
            </Route >
          </Route >
          
        </Routes>
      </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
