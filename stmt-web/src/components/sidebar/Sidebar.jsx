import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SourceIcon from '@mui/icons-material/Source';
import SchoolIcon from '@mui/icons-material/School';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PublishIcon from '@mui/icons-material/Publish';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import MessageIcon from '@mui/icons-material/Message';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LabelIcon from '@mui/icons-material/Label';
import GroupsIcon from '@mui/icons-material/Groups';
import ForumIcon from '@mui/icons-material/Forum';
import CommentIcon from '@mui/icons-material/Comment';
import LogoutIcon from '@mui/icons-material/Logout';
import AttachmentIcon from '@mui/icons-material/Attachment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';
import LayersIcon from '@mui/icons-material/Layers';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import { removeTokens } from '../../api/auth'; // These functions handle getting/setting tokens

export const Sidebar = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogout = () => {
        removeTokens(); // Remove the JWT token
        setIsAuthenticated(false);
        navigate('/login'); // Navigate to the login page
    };
  return (
    <div className="sidebar">
        <div className="top">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">Student Management</span>
            </Link>
        </div>
        <hr/>
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to="/" style={{textDecoration:"none"}}>
                <li>                    
                    <DashboardIcon className="icon"/>
                    <span>Dashboard</span>
                </li>
                </Link>
                <p className="title">LISTS</p>
                <Link to="/students" style={{textDecoration:"none"}}>
                <li>
                    <PersonOutlineIcon className="icon"/>
                    <span>Students</span>
                </li>
                </Link>          
                <Link to="/instructors" style={{textDecoration:"none"}}>     
                <li>
                    <SupervisorAccountIcon className="icon"/>
                    <span>Instructors</span>
                </li>
                </Link> 
                <Link to="/courses" style={{textDecoration:"none"}}>
                <li>
                    <LibraryBooksIcon className="icon"/>
                    <span>Courses</span>
                </li>
                </Link>
                <li>
                    <SummarizeIcon className="icon"/>
                    <span>Thesis</span>
                </li>
                <Link to="/terms" style={{textDecoration:"none"}}>   
                <li>
                    <AccessTimeIcon className="icon"/>
                    <span>Terms</span>
                </li>
                </Link>
                <Link to="/termcourses" style={{textDecoration:"none"}}>
                <li>
                    <BrowseGalleryIcon className="icon"/>
                    <span>TermCourses</span>
                </li>
                </Link>
                <li>
                    <LayersIcon className="icon"/>
                    <span>StudentCourses</span>
                </li>
                <p className="title">SERVICE</p>
                <li>
                    <QuestionAnswerIcon className="icon"/>
                    <span>Student Requests</span>
                </li>
                <li>
                    <CommentIcon className="icon"/>
                    <span>Thesis Feedback</span>
                </li>
                <li>
                    <GroupsIcon className="icon"/>
                    <span>Panel Creation</span>
                </li>
                <li>
                    <AttachmentIcon className="icon"/>
                    <span>Lecture Links</span>
                </li>
                {/*<li>
                    <PersonOutlineIcon className="icon"/>
                    <span>Settings</span>
                </li>
                <li>
                    <PersonOutlineIcon className="icon"/>
                    <span>Profile</span>
                </li>*/}
                <li onClick={() => handleLogout()}>
                    <LogoutIcon className="icon"/>
                    <span  >Logout</span>
                </li>
            </ul>
        </div>
            {/*  <div className="bottom">others</div>*/}
    </div>
  )
}
