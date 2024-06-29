import { Navbar } from "../../components/navbar/Navbar"
import { Sidebar } from "../../components/sidebar/Sidebar"
import "./new.scss"
import { AddStudent } from "../../components/addnew/AddStudent"
import { AddCourse } from "../../components/addnew/AddCourse"
import { AddInstructor } from "../../components/addnew/AddInstructor"
import { AddTerm } from "../../components/addnew/AddTerm"
import { AddTermCourse } from "../../components/addnew/AddTermCourse"
export const New = ({type}) => {
  return (
    <div className="new">
    <Sidebar/>
    <div className="newContainer">
      <Navbar/>
      
      {type === "student" && <AddStudent/>}
      {type === "course" && <AddCourse/>}  
      {type === "instructor" && <AddInstructor/>} 
      {type === "term" && <AddTerm/>}
      {type === "termCourse" && <AddTermCourse/>}
    </div>
    </div>
  )
}


export default New
