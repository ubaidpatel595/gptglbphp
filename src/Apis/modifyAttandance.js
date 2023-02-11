import "./assign.css";
import "../Home/Css/login.css";
import { useEffect, useState } from "react";

function updateSublist(sem,updtsubs){
    //This method is for production
    let auth = JSON.parse(localStorage.Authorization);
    let subjects = auth.subjects;
    let sublist = [];
    for(let i in subjects){
        if(subjects[i].sem === sem){
            sublist.push(subjects[i])
        }
    }
    updtsubs(sublist)
}
function subdetails(){
    let auth = JSON.parse(localStorage.Authorization);
    let sub = document.getElementById("select_subject").value;
    let subjects = auth.subjects;
    for(let i in subjects){
        if(subjects[i].code === sub){
            //console.log(subjects[i].branch)
           return subjects[i];
        }
    }
}     
//Getting Attendance
function getAttendance(updtlist){
    let auth = JSON.parse(localStorage.Authorization);
    let userid = auth.userid;
    let token = auth.token;
    let sem = subdetails().sem;
    let attend_date = document.getElementById("selectdate").value;
    let subject = document.getElementById("select_subject").value;
 
    let ajax  = new XMLHttpRequest();
    ajax.open("POST","http://127.0.0.1:3001/api/GetAttendance");
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

const finalizeattend=(list)=>{
    let teacher = (JSON.parse(localStorage.Authorization).userid);

    //Logic variables
    let absecount = 0;
    let prescount = 0;
    let updquery;

    //Api Requirements
    let token = (JSON.parse(localStorage.Authorization).token);
    let sem = document.getElementById("selectsem").value;
    let selecdate = document.getElementById("selectdate").value;

    //Creating Query
    let presentquery = "UPDATE attendance SET state ='PRESENT' WHERE ";
    let absentquery = "UPDATE attendance SET state ='ABSENT' WHERE ";

    for (let x in list){
        let attended = (document.getElementById("modify"+list[x].reg).checked);        
        if(attended){
            //state = "PRESENT";
            prescount +=1; 
            let qp = `student='${list[x].reg}' AND date='${selecdate}' OR `
            presentquery = presentquery+qp;
        }else{
            absecount +=1;
            let qp = `student='${list[x].reg}' AND date='${selecdate}' OR `
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
        updquery = presentquery;
    }else if(prescount === 0){
        updquery = absentquery
    }else{
        updquery = presentquery+';'+absentquery;
    }

    //Sending Attendance To Db

    let ajax  = new XMLHttpRequest();
    ajax.open("POST","http://127.0.0.1:3001/api/SqlWriteQueryExecuter");
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    ajax.onload=function (){
        console.log(this.responseText)
        let modstatus = document.getElementById("modifyresult");
        if(this.responseText >0){
            modstatus.innerHTML = "Attendance Updated";
            modstatus.style="color:green;";
        }else{
            modstatus.innerHTML = "Something went wrong";
            modstatus.style="color:red";
        }
        //alert("Updated")
    }
    let params = `userid=${teacher}&token=${token}&sem=${sem}&queryType=UPDATE&query=${updquery}`;
    ajax.send(params);
   // alert(document.getElementById("modify109CS20003").checked)
   console.log(updquery)
   // alert(query)  

}

function ModifyAttendance(){
    const [studentlist,updateList] = useState([{reg:"notloaded",name:"not loaded",sem:"0"}]);
    const [subjectlist,updatesubjects] = useState([{name:"No subjects found",code:"sdds",sem:"1"}]);
    useEffect(()=>{
        if(localStorage.Authorization){
            let subs = JSON.parse(localStorage.Authorization).subjects;
            updatesubjects(subs)
        }         
    },[])  
     
    return(
        <>
        {/* <h1>Hello World</h1> */}
        <div id="login-form" style={{maxHeight:"450px",overflowY:"auto"}} className="hidescroll">
            <h4 id="submitstatus" style={{display:"none"}}>""</h4>
            <h4 id="modifyresult">&nbsp;</h4>
            <form >
                <table>
                    <tbody>
                    <tr>
                      <td>Date:</td>
                      <td><input id="selectdate" type="date"/></td>
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
                                            <td><input type="checkbox" id={"modify"+data.reg} defaultChecked={(data.state === "PRESENT" ? true:false)}/></td>
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