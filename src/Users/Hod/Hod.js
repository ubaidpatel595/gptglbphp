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
import { savePdf } from "../Faculty/Faculty";
import { show } from "../Admin/Admin";
import { showEvent } from "../Admin/Admin";

//Getting reports
function HodGetReport(sem,type,updaterep){
    let auth = JSON.parse(localStorage.Authorization);
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            updaterep(this.responseText)
          console.log(this.responseText);
        }
      });
    if(type === "attendance"){
        xhr.open("POST", "http://localhost:3001/api/AbstractAttendance?token="+auth.token+"&userid="+auth.userid+"&sem="+sem);
        xhr.send();
    }else if(type === "cie"){
        xhr.open("POST", "http://localhost:3001/api/IAMarks?token="+auth.token+"&userid="+auth.userid+"&sem="+sem);
        xhr.send();
    }else if(type === "marks"){
        xhr.open("POST", "http://localhost:3001/api/MarksReport?token="+auth.token+"&userid="+auth.userid+"&Type=HOD&sem="+sem);
        xhr.send();
    }
}

function Hod(){
const [type,setType]=useState("");

//Dummy usestate for efresh when clicked assigned sub dont remove it
const [dummy,setDummy]=useState(0);

const [attshortage,setAttShortage] = useState('[{"subject":"Engineering Maths","name":"Ubaid","reg":"109CS20058","present":90,"absent":10}]');
const [cieMakeup,setCieMakeup] = useState('[{"reg":"109CS20058","name":"Ubaid","marks":[22,21,23,45,32],"subject":"Fundamentals","code":"109CS2S"}]');
const [marksReport,setMarksReport] = useState('[{"reg":"109CS20058","name":"Ubaid","subjects":[{"name":"Fundamentals","code":"20CS11t","ia":20,"exam":30}]}]');
 
    return(
        <div id="actions">
        <div className="flex-hod" >
            <div id="act-btns">
                <button className="buttons" onClick={(e)=>{showEvent(e,'action',['ciemakeup','attendshort','marksreport','ModifyAttendance','gen_reports','upload','upload_opts','assigned','markAttendance'])}}>Assign Subject</button><br/>
                <button className="buttons" onClick={(e)=>{async function refresh(){setDummy(dummy+1)}; refresh().then(showEvent(e,'assigned',['ciemakeup','attendshort','marksreport','ModifyAttendance','gen_reports','upload','upload_opts','action','markAttendance']))}}>Assigned Subjects</button><br/>
                <button className="buttons" onClick={(e)=>{showEvent(e,'markAttendance',['ciemakeup','attendshort','marksreport','ModifyAttendance','action','upload','upload_opts','assigned','gen_reports'])}}>Mark Attendance</button><br/>
                <button className="buttons" onClick={(e)=>{showEvent(e,'ModifyAttendance',['gen_reports','ciemakeup','attendshort','marksreport','action','upload','upload_opts','assigned','markAttendance'])}}>Modify Attendance</button><br/>
                <button className="buttons" onClick={(e)=>{showEvent(e,'gen_reports',['ciemakeup','attendshort','marksreport','ModifyAttendance','action','upload','upload_opts','assigned','markAttendance'])}}>Generate Reports</button><br/>
                <button className="buttons" onClick={(e)=>{showEvent(e,'upload',['ciemakeup','attendshort','marksreport','ModifyAttendance','gen_reports','action','upload_opts','assigned','markAttendance'])}}>Upload</button><br/>
            </div>
            <div id="action"><AssignSub/></div>
            <div id="assigned"><AssignedSub dummy={dummy}/></div>
            <div id="markAttendance"><MarkAttendance/></div>
            <div id="ModifyAttendance"><ModifyAttendance/></div>
            
            <div id="gen_reports">
                <button className="actButtons" onClick={(e)=>{showEvent(e,"attendshort",['marksreport','ciemakeup'])}}>Shortage Of Attendance</button><br/>
                <button className="actButtons" onClick={(e)=>{showEvent(e,"marksreport",['attendshort','ciemakeup'])}}>Students Report</button><br/>
                <button className="actButtons" onClick={(e)=>{showEvent(e,"ciemakeup",['marksreport','attendshort'])}}>CIE Makeup Students</button><br/>
            </div>

            <div id="upload">
                <button className="actButtons" onClick={(e)=>{showEvent(e,'upload_opts',['gen_reports',"action",]);setType("semMarks")}}>SEM Results </button><br/>
                <button className="actButtons" onClick={(e)=>{showEvent(e,'upload_opts',['gen_reports',"action",]);setType("iaMarks")}}>IA Marks</button><br/>
            </div>

           <div id="upload_opts">
            <Upload type={type}/>
           </div>

           <div id="attendshort">
           Select SEM<br/>
                <select onChange={(e)=>{HodGetReport(e.target.value,"attendance",setAttShortage)}}>
                    <option value="0">Select SEM</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            <button style={{marginLeft:"20px"}} onClick={()=>{savePdf("attendShortage")}}>Save as pdf</button>
           <AttendanceShortage report={attshortage}/>
           </div>
           <div id="marksreport">
                Select SEM<br/>
                <select onChange={(e)=>{HodGetReport(e.target.value,"marks",setMarksReport)}}>
                    <option value="0">Select SEM</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select> <button style={{marginLeft:"20px"}} onClick={()=>{savePdf("marksReportHod")}}>Save as pdf</button>
                <MarksReport report={marksReport}/>
           </div>
           <div id="ciemakeup">  
           Select SEM<br/>
                <select onChange={(e)=>{HodGetReport(e.target.value,"cie",setCieMakeup)}}>
                    <option value="0">Select SEM</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select><button style={{marginLeft:"20px"}} onClick={()=>{savePdf("CieMakeupReport")}}>Save as pdf</button>
           <CIEMakeup report={cieMakeup}/>
           </div>
        </div>
        
    </div>
    )
}
export default Hod;