import { useState } from "react";
import "../Css/hod.css";
import Upload from "../../Apis/Upload";
import AssignSub from "../../Apis/AssignSub";
import AssignedSub from "../../Apis/assignedSub";
import MarkAttendance from "../../Apis/markAttendance";
import ModifyAttendance from "../../Apis/modifyAttandance";

function show(elem,hide){
    let opt = document.getElementById(elem);
    opt.style="display:block";
    for(let x in hide){
        let opt = document.getElementById(hide[x]);
        opt.style="display:none";
    }
}
function Hod(){
const [type,setType]=useState("aa");
    return(
        <div id="actions">
        <div class="flex-hod" >
            <div id="act-btns">
                <button onClick={()=>{show('action',['ModifyAttendance','gen_reports','upload','upload_opts','assigned','markAttendance'])}}>Assign Subject</button><br/>
                <button onClick={()=>{show('assigned',['ModifyAttendance','gen_reports','upload','upload_opts','action','markAttendance'])}}>Assigned Subjects</button><br/>
                <button onClick={()=>{show('markAttendance',['ModifyAttendance','action','upload','upload_opts','assigned','gen_reports'])}}>Mark Attendance</button><br/>
                <button onClick={()=>{show('ModifyAttendance',['action','upload','upload_opts','assigned','markAttendance'])}}>Modify Attendance</button><br/>
                <button onClick={()=>{show('gen_reports',['ModifyAttendance','action','upload','upload_opts','assigned','markAttendance'])}}>Generate Reports</button><br/>
                <button onClick={()=>{show('upload',['ModifyAttendance','gen_reports','action','upload_opts','assigned','markAttendance'])}}>Upload</button><br/>
            </div>
            <div id="action"><AssignSub/></div>
            <div id="assigned"><AssignedSub/></div>
            <div id="markAttendance"><MarkAttendance/></div>
            <div id="ModifyAttendance"><ModifyAttendance/></div>
            
            <div id="gen_reports">
                <button>Shortage Of Attendance</button><br/>
                <button>Students Report</button><br/>
                <button>CIE Makeup Studentlist</button><br/>
                <button>SEE Makeup Studentlist</button><br/>
            </div>
            <div id="upload">
                <button onClick={()=>{show('upload_opts',['gen_reports',"action",]);setType("Sem Results")}}>SEM Results </button><br/>
                <button onClick={()=>{show('upload_opts',['gen_reports',"action",]);setType("Ia Marks")}}>IA Marks</button><br/>
            </div>
           <div id="upload_opts">
            <Upload type={type}/>
           </div>
        </div>
    </div>
    )
}
export default Hod;