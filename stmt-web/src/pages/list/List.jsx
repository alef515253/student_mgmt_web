import { StudentList } from "../../components/datatable/StudentList"
import { CourseList } from "../../components/datatable/CourseList"
import { InstructorList } from "../../components/datatable/InstructorList"
import { TermList } from "../../components/datatable/TermList"

import { Navbar } from "../../components/navbar/Navbar"
import { Sidebar } from "../../components/sidebar/Sidebar"
import "./list.scss"

export const List = ({type}) => {
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
        <Navbar/>
        {type === "student" && <StudentList/>}
        {type === "course" && <CourseList/>}
        {type === "instructor" && <InstructorList/>}
        {type === "term" && <TermList/>}

    </div>
    </div>
  )
}


export default List
