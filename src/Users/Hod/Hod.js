import { useState } from "react";
import "../Css/hod.css";
import Upload from "../../Apis/Upload";
import AssignSub from "../../Apis/AssignSub";
import AssignedSub from "../../Apis/assignedSub";
import MarkAttendance from "../../Apis/markAttendance";
import ModifyAttendance from "../../Apis/modifyAttandance";
import CIEMakeup from "../../Apis/CIEMakeup";
import MarksReport from "../../Apis/MarksReport";
import AttendanceShortage from "../../Apis/AttendanceShortage";
 

function show(elem,hide){
    let opt = document.getElementById(elem);
    opt.style="display:block";
    for(let x in hide){
        let opt = document.getElementById(hide[x]);
        opt.style="display:none";
    }
}

//Getting reports
function HodGetReport(sem,type,updaterep){
    let ajax = new XMLHttpRequest();
    ajax.onload = ()=>{
 //       console.log(ajax.responseText)
        updaterep(ajax.responseText)
    }
    let url;
    if(type == "attendance"){
        url = "http://localhost:3000/attendanceShortage";
        ajax.open("GET",url)
        ajax.send();
    }else if(type == "cie"){
        url = "http://localhost:3000/cieMakeup";
        ajax.open("GET",url)
        ajax.send();
    }else if(type = "marks"){
        url = "http://localhost:3000/marksreports";
        ajax.open("GET",url)
        ajax.send();
    }
}

function Hod(){
const [type,setType]=useState("aa");

//Dummy usestate for efresh when clicked assigned sub dont remove it
const [dummy,setDummy]=useState(0);

const [attshortage,setAttShortage] = useState('[{"reg":"109CS20058","name":"Ubaid","subjects":[{"subject":"Engineering Maths","total":30,"present":20,"absent":10,"perc":8}]}]');
const [cieMakeup,setCieMakeup] = useState('[{"reg":"109CS20058","name":"Ubaid","subjects":[{"subject":"Engineering Maths","average":8}]}]');
const [marksReport,setMarksReport] = useState('[{"reg":"109CS20058","name":"Ubaid","subjects":[{"name":"Fundamentals","code":"20CS11t","ia":"20","exam":"30","total":"39"}]}]');
 
    return(
        <div id="actions">
        <div className="flex-hod" >
            <div id="act-btns">
                <button onClick={()=>{show('action',['ciemakeup','attendshort','marksreport','ModifyAttendance','gen_reports','upload','upload_opts','assigned','markAttendance'])}}>Assign Subject</button><br/>
                <button onClick={()=>{async function refresh(){setDummy(dummy+1)}; refresh().then(show('assigned',['ciemakeup','attendshort','marksreport','ModifyAttendance','gen_reports','upload','upload_opts','action','markAttendance']))}}>Assigned Subjects</button><br/>
                <button onClick={()=>{show('markAttendance',['ciemakeup','attendshort','marksreport','ModifyAttendance','action','upload','upload_opts','assigned','gen_reports'])}}>Mark Attendance</button><br/>
                <button onClick={()=>{show('ModifyAttendance',['gen_reports','ciemakeup','attendshort','marksreport','action','upload','upload_opts','assigned','markAttendance'])}}>Modify Attendance</button><br/>
                <button onClick={()=>{show('gen_reports',['ciemakeup','attendshort','marksreport','ModifyAttendance','action','upload','upload_opts','assigned','markAttendance'])}}>Generate Reports</button><br/>
                <button onClick={()=>{show('upload',['ciemakeup','attendshort','marksreport','ModifyAttendance','gen_reports','action','upload_opts','assigned','markAttendance'])}}>Upload</button><br/>
            </div>
            <div id="action"><AssignSub/></div>
            <div id="assigned"><AssignedSub dummy={dummy}/></div>
            <div id="markAttendance"><MarkAttendance/></div>
            <div id="ModifyAttendance"><ModifyAttendance/></div>
            
            <div id="gen_reports">
                <button onClick={()=>{show("attendshort",['marksreport','ciemakeup'])}}>Shortage Of Attendance</button><br/>
                <button onClick={()=>{show("marksreport",['attendshort','ciemakeup'])}}>Students Report</button><br/>
                <button onClick={()=>{show("ciemakeup",['marksreport','attendshort'])}}>CIE Makeup Students</button><br/>
            </div>

            <div id="upload">
                <button onClick={()=>{show('upload_opts',['gen_reports',"action",]);setType("Sem Results")}}>SEM Results </button><br/>
                <button onClick={()=>{show('upload_opts',['gen_reports',"action",]);setType("Ia Marks")}}>IA Marks</button><br/>
            </div>

           <div id="upload_opts">
            <Upload type={type}/>
           </div>

           <div id="attendshort">
           Select SEM<br/>
                <select onChange={()=>{HodGetReport(1,"attendance",setAttShortage)}}>
                    <option value="0">Select SEM</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
           <AttendanceShortage report={attshortage}/>
           </div>
           <div id="marksreport">
                Select SEM<br/>
                <select onChange={()=>{HodGetReport(1,"marks",setMarksReport)}}>
                    <option value="0">Select SEM</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                <MarksReport report={marksReport}/>
           </div>
           <div id="ciemakeup">  
           Select SEM<br/>
                <select onChange={()=>{HodGetReport(1,"cie",setCieMakeup)}}>
                    <option value="0">Select SEM</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
           <CIEMakeup report={cieMakeup}/>
           </div>
        </div>
        
    </div>
    )
}
export default Hod;