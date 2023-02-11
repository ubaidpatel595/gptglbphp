import { Link } from "react-router-dom";
import "./Css/index.css";
import Profile from "./Profile.js";
function Header() {
    let styl = {
        width: "100px",
        height: "70px",
        backgroundColor: "rgb(171, 196, 218)",
        position: "absolute",
        top: "80px",
        right: "0px",
        borderBottomLeftRadius:"35px",
        zIndex:"5",
    }
    let styl1 = {
        height: "200px",
        backgroundColor: "rgb(171, 196, 218)",
        position: "absolute",
        top: "80px",
        right: "20px",
        paddingLeft:"10px",
        paddingRight:"10px",
        zIndex:"100",
    }
    function show(elem) {
        let opt = document.getElementById(elem);
        opt.classList.toggle('hide')
    }
  window.addEventListener("click",function(e){
    let ac = document.getElementById("account");
    let pr = document.getElementById("profile");
    if(ac.contains(e.target)==false && pr.contains(e.target) == false ){
        if(pr.classList != "hide"){
            show('profile');show('account')
        }
    }
  })
    return (
        <div id="header">
            <div className="flex">
                <img src="images/kar_logo.png" alt="" id="logo" />
                <h1 id="name">Government Polytechnic Gulbarga</h1>
            </div>

            {((JSON.parse(localStorage.Authorization).auth != "False")?<><div style={styl} id="account">
                <img src="images/account.svg" style={{width:"70px",height:"70px"}} onClick={()=>{show('profile');show('account')}}/>
            </div>

            <div id="profile" className="hide" style={styl1}>
            <img src="images/account.svg" style={{width:"70px",height:"70px"}} onClick={()=>{show('profile');show('account')}}/>
            <p style={{fontSize:"22px",marginTop:"-70px",marginLeft:"80px"}}>
            Welcome,<br/> {JSON.parse(localStorage.Authorization).name}</p>
            <img src="images/profile.svg" style={{width:"35px",height:"35px",marginTop:"20px"}}/>
            <p style={{fontSize:"15px",marginTop:"-30px",marginLeft:"50px"}}>
            <Link to="/Profile">Profile</Link> </p>
            <img src="images/logout.svg" style={{width:"35px",height:"35px"}}/><p style={{fontSize:"15px",marginTop:"-30px",marginLeft:"50px"}}>
            <Link to="/logout">Logout</Link> </p>
            </div></>:<></>)}
        </div>
    )
}

export default Header;