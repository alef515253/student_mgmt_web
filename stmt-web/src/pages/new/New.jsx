import { Navbar } from "../../components/navbar/Navbar"
import { Sidebar } from "../../components/sidebar/Sidebar"
import "./new.scss"

export const New = ({title}) => {
  return (
    <div className="new">
    <Sidebar/>
    <div className="newContainer">
      <Navbar/>
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="bottom">
        <div className="left"></div>
        <div className="right">
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

        </div>
      </div>
    </div>
    </div>
  )
}


export default New
