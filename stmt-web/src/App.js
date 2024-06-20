import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import PrivateRoute from './PrivateRoute';
import { AuthProvider, useAuth } from './AuthProvider';
import axiosInstance from './api/axios';

function App() {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/stm/students');
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
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
              <Route  index element={<PrivateRoute role="ROLE_USER"><List/></PrivateRoute>}/>
              <Route  path=":studentId" element={<PrivateRoute role="ROLE_USER"><Single/></PrivateRoute>}/>
              <Route  path="new" element={<PrivateRoute role="ROLE_USER"><New  title="Add New Student"/></PrivateRoute>}/>
            </Route >
            <Route  path="users" role="admin">
              <Route  index element={<PrivateRoute role="ROLE_USER"><List/></PrivateRoute>}/>
              <Route  path=":userId" element={<PrivateRoute role="ROLE_USER"><Single/></PrivateRoute>}/>
              <Route  path="new" element={<PrivateRoute role="ROLE_USER"><New/></PrivateRoute>}/>
            </Route >
          </Route >
          
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
