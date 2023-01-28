import "./assign.css";
import "../Home/Css/login.css";
import {useForm} from "react-hook-form";
import { useState } from "react";

function updateSublist(sem,updtsubs){
    //This method is for development testing
    // let userid = JSON.parse(localStorage.Authorization).userid;
    // let token = JSON.parse(localStorage.Authorization).token;
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
    let auth = JSON.parse(localStorage.Authorization);
    let subjects = auth.subjects;
    let sublist = [];
    for(let i in subjects){
        if(subjects[i].sem == sem){
            sublist.push(subjects[i])
        }
    }
    updtsubs(sublist)
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
    ajax.open("POST","/api/GetAttendance");
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    ajax.onload=function (){
       
        
        localStorage.Attendance=this.responseText;
        //alert("Loaded");
       // console.log(this.responseText)
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

    //Logic variables
    let absecount = 0;
    let prescount = 0;
    let query;

    //Api Requirements
    let token = (JSON.parse(localStorage.Authorization).token);
    let sem = document.getElementById("selectsem").value;
    let selecdate = document.getElementById("selectdate").value;

    let type = document.getElementById("attendancetype").value;

    //Creating Query
    let presentquery = "UPDATE attendance SET state ='PRESENT' WHERE ";
    let absentquery = "UPDATE attendance SET state ='ABSENT' WHERE ";

    for (let x in list){
        let attended = (document.getElementById(list[x].reg).checked);        
        if(attended){
            //state = "PRESENT";
            prescount +=1; 
            let qp = `student='${list[x].reg}' AND date='${selecdate}' OR `
            presentquery = presentquery+qp;
        }else{
            absecount +=1;
            let qp = `student='${list[x].reg}' OR `
            absentquery = absentquery+qp;
            //state = "ABSENT";
        }           
        } 
   

    //Removing Extra OR from query
    presentquery = presentquery.slice(0,presentquery.length-4)
    absentquery = absentquery.slice(0,absentquery.length-4)

    //Submitting Query based on logic
    //alert(absecount)
    if(absecount === 0){
        query = presentquery;
    }else if(prescount === 0){
        query = absentquery
    }else{
        query = presentquery+';'+absentquery;
    }

    //Sending Attendance To Db

    let ajax  = new XMLHttpRequest();
    ajax.open("POST","/api/SqlWriteQueryExecuter");
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    ajax.onload=function (){
        console.log(this.responseText)
        let modstatus = document.getElementById("modifyresult");
        if(this.responseText >0){
            modstatus.innerHTML = "Attendance Updated";
            modstatus.style="color:green";
        }else{
            modstatus.innerHTML = "Something went wrong";
            modstatus.style="color:red";
        }
        //alert("Updated")
    }
    let params = `userid=${teacher}&token=${token}&sem=${sem}&queryType=UPDATE&query=${query}`;
    ajax.send(params);
<<<<<<< HEAD
   // alert(document.getElementById("modify109CS20003").checked)
  // console.log(updquery)
=======
    
>>>>>>> parent of 51d9a2b (Most of the things are working fine)
   // alert(query)  

}

function ModifyAttendance(){
    const [studentlist,updateList] = useState([{reg:"notloaded",name:"not loaded",sem:"0"}]);
    const [subjectlist,updatesubjects] = useState([{name:"No subjects found",code:"sdds",sem:"1"}]);  
     
    return(
        <>
        {/* <h1>Hello World</h1> */}
        <div id="login-form">
            <h4 id="submitstatus" style={{display:"none"}}></h4>
            <h4 id="modifyresult"></h4>
            <form >
                <table>
                    <tbody>
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
                                    return <option key={d.code} value={d.code}>{d.name}</option>
                                })}
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <td colSpan={2} id="tickstudent" > Tick Students:</td></tr>
                    <tr>
                        <td colSpan={2} id="studentlist" > 
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
                                            <td><input type="checkbox" id={data.reg} defaultChecked={(data.state == "PRESENT" ? true:false)}/></td>
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
export default ModifyAttendance;