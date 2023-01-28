import "./assign.css";
import "../Home/Css/login.css";
import {useForm} from "react-hook-form";
import { useState } from "react";

function getStudent(sem,listupdate,updtsubs){
    let auth = JSON.parse(localStorage.Authorization);
    let userid = auth.userid;
    let token = auth.token;
   // alert(userid)
    let ajax  = new XMLHttpRequest();
    ajax.open("POST","/api/GetStudent");
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    ajax.onload=function (){

    //The Below MEthod is only created for testing
    // let getsubs = new XMLHttpRequest();
    // getsubs.open("POST","/api/GetSubject");
    // getsubs.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    // getsubs.onload=()=>{
    //     //console.log(getsubs.responseText)
    //         let subjects = JSON.parse(getsubs.responseText);
    //         updtsubs(subjects);
    //     }
    
    // let getsubparam = `userid=${userid}&token=${token}&value=${sem}&type=sem`;
    // getsubs.send(getsubparam);
        
    //This method is for production 
        let subjects = auth.subjects;
        let sublist = [];
        for(let i in subjects){
            if(subjects[i].sem == sem){
                sublist.push(subjects[i])
            }
        }
        updtsubs(sublist)
        
        listupdate(JSON.parse(this.responseText))
        localStorage.studentList=this.responseText;
        // alert("Loaded");
      //  console.log(JSON.parse(this.responseText))
    }
    let params = `userid=${userid}&token=${token}&sem=${sem}`;
    ajax.send(params);
}
  
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
    console.log(query);
    let ajax  = new XMLHttpRequest();
    ajax.open("POST","localhost:3001/api/SqlWriteQueryExecuter");
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    ajax.onload=function (){
        console.log(this.responseText)
        let submitstatus = document.getElementById("submitstatus");
        if(this.responseText >1){
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

function MarkAttendance(){
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
                    <tbody>
                    <tr>
                        <td>Sem:</td>
                        <td> 
                            <select name="sem" id="selectsem" onChange={(e)=>{getStudent(e.target.value,updateList,updatesubjects)}}>
                                <option key="val" value="1">Select Sem</option>
                                <option key="1" value="1">1</option>
                                <option key="2" value="2">2</option>
                                <option key="3" value="3">3</option>
                                <option key="4" value="4">4</option>
                                <option key="5" value="5">5</option>
                                <option key="6" value="6">6</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Subject:</td>
                        <td> 
                            <select name="subject" id="selectsubject">
                                <option value="1">Select Subject</option>
                                {subjectlist.map((d)=>{
                                    return <option key={d.code} value={d.code}>{d.name}</option>
                                })}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Type:</td>
                        <td> 
                            <select name="type" id="attendancetype" onChange={updateType} >
                                <option key="0"value="1">Select Type</option>
                                <option key="1"value="allpresent">All Present</option>
                                <option key="2"value="allabsent">All Absent</option>
                                <option key="3"value="somepresent">Some Present</option>
                                <option key="4"value="someabsent">Some Absent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <td colSpan={2} id="tickstudent" style={{textAlign:"center",display:"none"}}> Tick Students:</td></tr>
                    <tr>
                        <td colSpan={2} id="studentlist" style={{display:"none"}}> 
                            <table className="studenttable">
                                <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>Reg no</td>
                                    <td>Attendance</td>
                                </tr>
                                {
                                  studentlist.map((data)=>{
                                    return(
                                        <tr key={data.reg}>
                                            <td>{data.name}</td>
                                            <td>{data.reg}</td>
                                            <td><input type="checkbox" id={data.reg}/></td>
                                        </tr>
                                    )
                                  })
                                }
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="button" name="login" id="submit-button" onClick={()=>{finalizeattend(studentlist)}}>Save Attendance</button>
            </form>
        </div>
        </>
    )
}
export default MarkAttendance;