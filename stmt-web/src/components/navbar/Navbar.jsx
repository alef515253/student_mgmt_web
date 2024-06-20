import "./navbar.scss"
import ListIcon from '@mui/icons-material/List';
import React, { useState ,useEffect} from 'react';
import { jwtDecode } from "jwt-decode";

export const Navbar = () => {
    const [username, setUsername] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        let decodedToken = null;
        if (token) decodedToken = jwtDecode(token); 
        
        if(token && decodedToken && decodedToken.sub){
            setUsername(decodedToken.sub);
        }

    });
    

  return (
    <div className="navbar">
        <div className="wrapper">
            <div className="search">

            </div>
            <div className="items">
                <div className="item" >Welcome {username}
                   {/* <ListIcon className="icon"/>*/}
                </div>
                {/*<div className="item">
                    <img
                        src=""
                        alt=""
                        className="avatar"
                    />
                </div>*/}
            </div>
        </div>
    </div>
  )
}
