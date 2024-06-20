import "./single.scss"
import { Navbar } from "../../components/navbar/Navbar"
import { Sidebar } from "../../components/sidebar/Sidebar"
export const Single = () => {
  return (
    <div className="single">
    <Sidebar/>
    <div className="singleContainer">
        <Navbar/>
        <div className="top">
            <div className="left">
                <h1 className="title">Information</h1>
                <div className="item">
                    
                </div>
            </div>
            <div className="right">

            </div>
            <div className="bottom"></div>
        </div>
    </div>
    </div>
  )
}


export default Single
