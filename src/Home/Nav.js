import { useState } from "react";
import { Link,NavLink, useNavigate} from "react-router-dom";
import "./Css/index.css";
var cnt = 1;
function change(){
    let elem = document.getElementById("menu");
    elem.classList.toggle("change")

 if (cnt == 1){
    let menu = document.getElementById("mob-nav");
    menu.className="show";
    cnt -=1;
 }else{
    let menu = document.getElementById("mob-nav");
    menu.className="hide";
    cnt=1;
 }
}
function Logout(nav,sets){
    localStorage.setItem("Authorization",'{"auth":"false"}');
    setTimeout(()=>{nav("/home")},200)
}

function Nav({Auth}){
    //Using useNAvigate Hook To Redirect User
    const Navigate = useNavigate();

    if(Auth == "true" ){
        return(
            <>
            <div id="desk-nav">
                <div className="flex">
                  <Link to="/"><button>Home</button></Link> 
                  <Link to="/courses"><button>Courses</button></Link> 
                  <Link to="/Admission"><button>Admission</button></Link>  
                  <Link to="/logout"><button>Logout</button></Link> 
                  <Link to="/About"><button>About Us</button></Link> 
                </div>
            </div>
            <div id="menu" onClick={change}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <div id="mob-nav" className="hide">
                <Link to="/"><button>Home</button></Link> 
                <Link to="/courses"><button>Courses</button></Link> 
                <Link to="/Admission"><button>Admission</button></Link>  
                <Link to="/logout"><button>Logout</button></Link> 
                <Link to="/About"><button>About Us</button></Link> 
            </div>
            </>)
      }else{
        return(
            <>
            <div id="desk-nav">
                <div className="flex">
                  <Link to="/"><button>Home</button></Link> 
                  <Link to="/courses"><button>Courses</button></Link> 
                  <Link to="/Admission"><button>Admission</button></Link>  
                  <Link to="/Login"><button>Login</button></Link> 
                  <Link to="/Register"><button>Register</button></Link>  
                  <Link to="/About"><button>About Us</button></Link> 
                </div>
            </div>
            <div id="menu" onClick={change}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <div id="mob-nav" className="hide">
                <Link to="/"><button>Home</button></Link> 
                <Link to="/courses"><button>Courses</button></Link> 
                <Link to="/Admission"><button>Admission</button></Link>  
                <Link to="/Login"><button>Login</button></Link> 
                <Link to="/Register"><button>Register</button></Link>  
                <Link to="/About"><button>About Us</button></Link> 
            </div>
            </>)
      }
    
}
export default Nav;