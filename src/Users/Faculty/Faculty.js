import "../Css/hod.css";
import Upload from "../../Apis/Upload";
import Attendance from "../../Apis/Attendance";
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

function Faculty(){
    return(
        <div id="actions">
        <div class="flex" style={{margin:"0px"}}>
            <div id="act-btns">
                <button onClick={()=>{show('markAttendance',['ModifyAttendance','gen_reports','upload','upload_opts'])}}>Mark Attendance</button><br/>
                <button onClick={()=>{show('ModifyAttendance',['markAttendance',,'gen_reports','upload','upload_opts'])}}>Modify Attendance</button><br/>
                <button onClick={()=>{show('gen_reports',['ModifyAttendance','markAttendance','upload','action','upload_opts'])}}>Generate Reports</button>  <br/> 
                <button onClick={()=>{show('upload',['ModifyAttendance','markAttendance','gen_reports','upload_opts'])}}>Upload</button><br/>
            </div>
            <div id="action"><Attendance/></div>
            <div id="markAttendance"><MarkAttendance/></div>
            <div id="ModifyAttendance"><ModifyAttendance/></div>
            <div id="gen_reports">
                <button>Attendance</button><br/>
                <button>Marks</button><br/>
            </div>
            <div id="upload">
                <button onClick={()=>{show('upload_opts')}}>IA Marks</button><br/>
            </div>
           <div id="upload_opts" ><Upload type="IA Marks"/></div>
        </div>
    </div>
    )
}
export default Faculty;