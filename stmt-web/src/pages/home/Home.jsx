import { Widget } from "../../components/widget/Widget"
import { Navbar } from "../../components/navbar/Navbar"
import { Sidebar } from "../../components/sidebar/Sidebar"
import "./home.scss"
import { Featured } from "../../components/featured/Featured"
import { Chart } from "../../components/chart/Chart"
import { CustomTable } from "../../components/table/CustomTable"

export const Home = () => {
  return (
    <div className="home">
        <Sidebar/>  
        <div className="homeContainer">
            <Navbar/>
            <div className="widgets">
                <Widget type="student"/>
                <Widget type="instructor"/>
                <Widget type="course"/>
                <Widget type="thesis"/>
            </div>
            <div className="charts">
                <Featured/>
                <Chart/>
            </div>
           {/* <div className="listContainer">
              <div className="listTitle">
                Latest Transactions
              </div>
              <CustomTable/>
            </div>
            */} 
            </div>  
    </div>
  )
}


export default Home
