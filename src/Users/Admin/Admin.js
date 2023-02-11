import { useState } from "react";
import "../Css/admin.css";
import Upload from "../../Apis/Upload";
import ViewDisplay from "../../Apis/ViewDisplay";
import '../../Home/Css/login.css'

//Show Function With Event for active marking of componet
function showEvent(e,elem,hide){
    //Showing The Element 
    let opt = document.getElementById(elem);
    opt.style="display:block";

    //Getting all active elements and marking inactive
    let elements =  document.getElementsByClassName("active");
    async function inactive() {
       if(elements.length > 0){
        for (var i = 0; i < elements.length; i++) {
            elements.item(i).classList.toggle('active');
         }
    }}
    //Marking Present clicked element Active And Hiding Elements
    inactive().then((value)=>{
        e.target.classList.toggle("active")
        for(let x in hide){
            let opt = document.getElementById(hide[x]);
            opt.style="display:none";
        }
    });
    }

//show funcion without event
function show(elem,hide){
    let opt = document.getElementById(elem);
    opt.style="display:block";
    for(let x in hide){
        let opt = document.getElementById(hide[x]);
        opt.style="display:none";
    }
}

function getStudents(sem,updt){
    let branch = document.getElementById("branchSelect").value;
    let xhttp = new XMLHttpRequest();
    let Auth = JSON.parse(localStorage.Authorization);
    let params = `userid=${Auth.userid}&token=${Auth.token}&sem=${sem}&branch=${branch}`;

    xhttp.onload = function() {
        updt(this.responseText)
    }
    xhttp.open("POST", "http://127.0.0.1:3001/api/GetStudent");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}
function getFaculty(branch,updt){
  //  let branch = document.getElementById("branchSelect").value;
    let xhttp = new XMLHttpRequest();
    let Auth = JSON.parse(localStorage.Authorization);
    let params = `userid=${Auth.userid}&token=${Auth.token}&branch=${branch}`;

    xhttp.onload = function() {
        updt(this.responseText)
    }
    xhttp.open("POST", "http://127.0.0.1:3001/api/GetFaculty");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

function deleteUser(){
    let conf = window.confirm("Do yoou really Want to delete user this action can't be undone");
    if(conf){
        let auth = JSON.parse(localStorage.Authorization)  ;
        let deluserid = document.getElementById("delUserid").value;
        let xhttp = new XMLHttpRequest();
        let Auth = JSON.parse(localStorage.Authorization);
        let params = `userid=${Auth.userid}&token=${Auth.token}&deluserid=${deluserid}`;
        xhttp.onload = function() {
            if(this.responseText === 1 || this.responseText === "1"){
                let elem = document.getElementById("delResult");
                elem.innerHTML = "Deleted Successfully";
                elem.style="color:green";
            }else{
                let elem = document.getElementById("delResult");
                elem.innerHTML = "Something went wrong";
                elem.style="color:red";
            }
            console.log(this.responseText);
        }
        xhttp.open("POST", "http://127.0.0.1:3001/api/DeleteUser");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
    }
}

function Admin(){
    const [type,setType]=useState("");
    const [students,setStudents]=useState('[{"name": "Carolus Causbey","reg": "109CV2001","sem": "2" }]')
    const [faculty,setFaculty]=useState('[{"name": "Carolus Causbey","userid": "109CV2001","mobile":"9000122556","email":"hsjgsahgjsa@gmail.com" }]')
    return(
        <div id="actions">
        <div className="flex" style={{margin:"0px"}}>
            <div id="act-btns">
                <button className="buttons" onClick={(e)=>{showEvent(e,'upload',['view','delete','viewDisplay','facultyView'])}}>Upload</button><br/>
                <button className="buttons" onClick={(e)=>{showEvent(e,'view',['upload','delete','action','viewDisplay','facultyView'])}}>View</button>  <br/> 
                <button className="buttons" onClick={(e)=>{showEvent(e,'delete',['view','upload','action','viewDisplay','facultyView'])}}>Delete User</button><br/>
            </div>
            <div id="upload">
                <button className="actButtons" onClick={(e)=>{showEvent(e,'action',['viewDisplay','facultyView']);setType("student")}}>Student</button><br/>
                <button className="actButtons" onClick={(e)=>{showEvent(e,'action',['viewDisplay','facultyView']);setType("faculty")}}>Faculty</button>
            </div>
            <div id="view">
                <button className="actButtons" onClick={(e)=>{showEvent(e,'viewDisplay',['facultyView'])}}>Students</button><br/>
                <button className="actButtons" onClick={(e)=>{showEvent(e,'facultyView',['viewDisplay'])}}>Faculty</button><br/>
            </div>
            <div id="delete" className="login-form" style={{height:"100px"}}>
                <h4 id="delResult" style={{margin:"0px"}}>&nbsp;</h4>
                Enter Userid:<input type="text"  id="delUserid"/><br/>
                <button className="submit-button" onClick={()=>{deleteUser()}}>Delete User</button>
            </div>
            <div id="viewDisplay" style={{display:'none'}}>
                <ViewDisplay getData={getStudents} data={students} setData={setStudents} type={"student"}/>
            </div>
            <div id="facultyView" style={{display:'none'}}>
                <ViewDisplay getData={getFaculty} data={faculty} setData={setFaculty} type={"faculty"}/>
            </div>
           <div id="action">
            <Upload type={type}/>
           </div>
        </div>
    </div>
    )
}
export default Admin;
export {showEvent};
export {show};