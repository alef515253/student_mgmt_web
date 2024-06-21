import "./login.scss";
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import { setAccessToken ,setRefreshToken } from '../../api/auth'; // These functions handle getting/setting tokens

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate ();
    const {isAuthenticated, setIsAuthenticated } = useAuth();
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
      setError(''); 
      
      if (token && isAuthenticated) {
          navigate('/'); // Redirect to home if already authenticated
      }
  }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8089/stmmgmt/api/auth/signin', { username, password });
            setIsAuthenticated(true); 
            setAccessToken(response.data.accessToken);
            setRefreshToken(response.data.refreshToken);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
              setError('Invalid username or password.');
            } else {
              setError('An error occurred. Please try again.');
            }
          }
    };

    return (
        <div className="login-container">
      <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Login</button>
        </form>
        </div>
    );
}

export default Login;