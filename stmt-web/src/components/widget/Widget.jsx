import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export const Widget = ({ type }) => {
  let data;
  const diff=10000000;
    switch(type){
      case "student":
          data={
            title: "STUDENTS",
            isMoney: false,
            link: "See all students",
            icon: <PersonOutlineIcon className="icon" 
              style={{
                color:"crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",

              }}
              />,
            
          };
          break;
          case "instructor":
            data={
              title: "INSTRUCTORS",
              isMoney: false,
              link: "See all instructors",
              icon: <SupervisorAccountIcon className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }} />,
              
            };
            break;
            case "course":
              data={
                title: "COURSES",
                isMoney: false,
                link: "See all courses",
                icon: <LibraryBooksIcon className="icon"
                style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }} />,
                
              };
              break;
              case "thesis":
                data={
                  title: "THESIS",
                  isMoney: false,
                  link: "See all thesis",
                  icon: <SummarizeIcon className="icon"
                  style={{
                    backgroundColor: "rgba(128, 0, 128, 0.2)",
                    color: "purple",
                  }} />,
                  
                };
                break;
            
          default:
            break;
    }
  return (
    <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">{diff}</span>
          {/*<span className="link">{data.link}</span>*/}
        </div>
        <div className="right">
          {/*<div className="percentage positive">
            <KeyboardArrowUpIcon/>
            {diff} %
          </div>*/}
          {data.icon}

        </div>
    </div>
  )
}
