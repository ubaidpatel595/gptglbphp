import "./assign.css";
import "../Home/Css/login.css";
import {useForm} from "react-hook-form";
import { useState } from "react";

function updateSublist(sem,updtsubs){
        let subjects = JSON.parse(localStorage.Authorization).subjects;
        let sublist = [];
        for (let x in subjects){
            if (subjects[x].sem == sem){
                sublist.push(subjects[x])
            }
        }
        updtsubs(sublist);
}

//Getting Attendance
function getAttendance(updtlist){
    let auth = JSON.parse(localStorage.Authorization);
    let userid = auth.userid;
    let token = auth.token;
    let sem = document.getElementById("selectsemester").value;
    let attend_date = document.getElementById("selectdate").value;
    let subject = document.getElementById("select_subject").value;
 
    let ajax  = new XMLHttpRequest();
    ajax.open("POST","http://localhost/newphp/api/getAttendance.php");
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    ajax.onload=function (){
       
        
        localStorage.Attendance=this.responseText;
        //alert("Loaded");
        console.log(this.responseText)
     let a = JSON.parse(this.responseText);
     updtlist(a)
    }
    let params = `userid=${userid}&token=${token}&sem=${sem}&subject=${subject}&date=${attend_date}`;
    ajax.send(params);
}

//Type Based Attendance Logic
const updateType=(e)=>{
    let typ = e.target.value;
    if( typ === "allpresent" || typ ==="allabsent"){
        document.getElementById("tickstudent").style="display:none"
        document.getElementById("studentlist").style="display:none"
    }else{
      document.getElementById("tickstudent").style="display:;text-align:center"
      document.getElementById("studentlist").style="display:;" 
    }

}

const finalizeattend=(list)=>{
    let subject = (document.getElementById("selectsubject").value);
    let teacher = (JSON.parse(localStorage.Authorization).userid);

    //Api Requirements
    let token = (JSON.parse(localStorage.Authorization).token);
    let sem = document.getElementById("selectsem").value;

    let type = document.getElementById("attendancetype").value;

    //Creating Query
    let query = "INSERT INTO attendance (subject,teacher,student,state) VALUES ";

    //Adding Query values Based on input
    if(type === "somepresent"){
        for (let x in list){
            let attended = (document.getElementById(list[x].reg).checked);
            let state;
            if(attended){
                state = "PRESENT";
            }else{
                state = "ABSENT";
            }            
            query = query+`('${subject}','${teacher}','${list[x].reg}','${state}'),`;
        } 
    }else if(type === "someabsent"){

        for (let x in list){
            let attended = (document.getElementById(list[x].reg).checked);
            let state;
            if(attended){
                state = "ABSENT";
            }else{
                state = "PRESENT";
            }            
            query = query+`('${subject}','${teacher}','${list[x].reg}','${state}'),`;
        } 
       // alert(" Some Absent")
    }else if(type === "allpresent"){
        for (let x in list){
            let attended = (document.getElementById(list[x].reg).checked);            
            query = query+`('${subject}','${teacher}','${list[x].reg}','PRESENT'),`;
        } 
       // alert(" All Present")
    }else{
        for (let x in list){
            let attended = (document.getElementById(list[x].reg).checked);            
            query = query+`('${subject}','${teacher}','${list[x].reg}','ABSENT'),`;
        } 
        //alert("All Absent")
    } 

    //Removing Extra , from query
    query = query.slice(0,query.length-1)

    //Sending Attendance To Db

    let ajax  = new XMLHttpRequest();
    ajax.open("POST","http://localhost/newphp/api/sqlQueryExecuter.php");
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    ajax.onload=function (){
        console.log(this.responseText)
        let submitstatus = document.getElementById("submitstatus");
        if(this.responseText == "1"){
            submitstatus.innerHTML = "Attendance Submitted";
            submitstatus.style="color:green";
        }else{
            submitstatus.innerHTML = "Attendance Already Submitted";
            submitstatus.style="color:red";
        }
        //alert("Updated")
    }
    let params = `userid=${teacher}&token=${token}&sem=${sem}&queryType=CREATE&query=${query}`;
    ajax.send(params);
    
   // alert(query)  
}

function ModifyAttendance(){
    const [studentlist,updateList] = useState([{reg:"not loaded",name:"not loaded",sem:"0"}]);
    const [subjectlist,updatesubjects] = useState([{name:"No subjects found",code:"sdds",sem:"1"}]);  
     
    return(
        <>
        {/* <h1>Hello World</h1> */}
        <div id="login-form">
            <h4 id="submitstatus" style={{display:"none"}}></h4>
            <h4 id="result"></h4>
            <form >
                <table>
                    <tr>
                      <td>Sem:</td>
                      <td><input id="selectdate" type="date"/></td>
                    </tr>
                    <tr>
                        <td>Sem:</td>
                        <td> 
                            <select name="sem" id="selectsemester" onChange={(e)=>{updateSublist(e.target.value,updatesubjects)}} >
                                <option value="1w">Select Sem</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Subject:</td>
                        <td> 
                            <select name="subject" id="select_subject" onChange={()=>{getAttendance(updateList)}}>
                                <option value="1">Select Subject</option>
                                {subjectlist.map((d)=>{
                                    return <option value={d.code}>{d.name}</option>
                                })}
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <td colSpan={2} id="tickstudent" > Tick Students:</td></tr>
                    <tr>
                        <td colSpan={2} id="studentlist" > 
                            <table className="studenttable">
                                <tr>
                                    <td>Name</td>
                                    <td>Reg no</td>
                                    <td>Attendance</td>
                                </tr>
                                {
                                  studentlist.map((data)=>{
                                    return(
                                        <tr>
                                            <td>{data.name}</td>
                                            <td>{data.reg}</td>
                                            <td><input type="checkbox" id={data.reg} checked={(data.state == "PRESENT" ? true:false)}/></td>
                                        </tr>
                                    )
                                  })
                                }
                            </table>
                        </td>
                    </tr>
                </table>
                <button type="button" name="login" id="submit-button" onClick={()=>{finalizeattend(studentlist)}}>Assign</button>
            </form>
        </div>
        </>
    )
}
export default ModifyAttendance;