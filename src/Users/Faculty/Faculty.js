import "../Css/hod.css";
import Upload from "../../Apis/Upload";
import Attendance from "../../Apis/Attendance";
import MarkAttendance from "../../Apis/markAttendance";
import ModifyAttendance from "../../Apis/modifyAttandance";
import { useState } from "react";
import DetailedAttendance from "../../Apis/Detailedattendance";
import AbstractAttendance from "../../Apis/AbstractAttendance";
import IAReport from "../../Apis/IAReport";

function show(elem,hide){
    let opt = document.getElementById(elem);
    opt.style="display:block";
    for(let x in hide){
        let opt = document.getElementById(hide[x]);
        opt.style="display:none";
    }
}

//Getting reports
function getReport(sem,type,updaterep){
    let ajax = new XMLHttpRequest();
    ajax.onload = ()=>{
 //       console.log(ajax.responseText)
        updaterep(ajax.responseText)
    }
    let url;
    if(type == "abstract"){
        url = "http://localhost:3000/getAbstractAttendance";
        ajax.open("GET",url)
        ajax.send();
    }else if(type == "detailed"){
        url = "http://localhost:3000/getDetailedAttendance";
        ajax.open("GET",url)
        ajax.send();
    }else if(type = "iamarks"){
        url = "http://localhost:3000/getiamarks";
        ajax.open("GET",url)
        ajax.send();
    }
}

function Faculty(){
    var reptyp = "";
    const [detailedReport,SetDetailedReport] = useState('[{"name":"Ubaid","reg":"109CS20058","attendance":[{"date":"2023-1-23","state":"PRESENT"},{"date":"2023-1-24","state":"PRESENT"},{"date":"2023-1-25","state":"Absent"}]}]')
    const [abstractReport,setAbstractReport] = useState('[{"name":"Ubaid","reg":"109CS20058","present":"20","absent":"10","total":"30","perc":"80%"}]')
    const [iaReport,setIaReport]=useState('[{"reg":"109CS20058","name":"Ubaid","marks":[22,21,23,45,32]}]')
    return(
        <div id="actions">
        <div class="flex" style={{margin:"0px"}}>
            <div id="act-btns">
                <button onClick={()=>{show('markAttendance',['marksrep','attendrep','ModifyAttendance','gen_reports','upload','upload_opts'])}}>Mark Attendance</button><br/>
                <button onClick={()=>{show('ModifyAttendance',['marksrep','attendrep','markAttendance',,'gen_reports','upload','upload_opts'])}}>Modify Attendance</button><br/>
                <button onClick={()=>{show('gen_reports',['marksrep','attendrep','ModifyAttendance','markAttendance','upload','action','upload_opts'])}}>Generate Reports</button>  <br/> 
                <button onClick={()=>{show('upload',['marksrep','attendrep','ModifyAttendance','markAttendance','gen_reports','upload_opts'])}}>Upload</button><br/>
            </div>
            <div id="action"><Attendance/></div>
            <div id="markAttendance"><MarkAttendance/></div>
            <div id="ModifyAttendance"><ModifyAttendance/></div>
            <div id="gen_reports">
                <button
                onClick={()=>{show('attendrep',['marksrep','upload','ModifyAttendance','markAttendance','upload_opts'])}}
                >Attendance</button><br/>
                <button
                onClick={()=>{show('marksrep',['upload','attendrep','ModifyAttendance','markAttendance','upload_opts'])}}
                >Marks</button><br/>
            </div>

            <div id="attendrep">
            Select Type<br/>
                <select onChange={(e)=>{reptyp= e.target.value;(e.target.value == "detailed")?show('detailedrep',['abstractrep'])
                    :(e.target.value == "abstract")?show('abstractrep',['detailedrep']):show("attendrep",['abstractrep','detailedrep'])}} >
                    <option value="0">Select Type</option>
                    <option value="detailed">Detailed Attendance Report</option>
                    <option value="abstract">Abstract Attendance Report</option>
                </select><br/>
            <select onChange={(e)=>{(reptyp == "detailed")?getReport(1,"detailed",SetDetailedReport):
            (reptyp == "abstract")?getReport(1,"abstract",setAbstractReport):show("attendrep",['abstractrep','detailedrep']);
            (e.target.value == "0")?show("attendrep",['abstractrep','detailedrep']):(reptyp == "abstract")?show("abstractrep",['detailedrep']):show("detailedrep",['abstractrep'])}}>
                        <option value="0">Select Subject</option>
                        {JSON.parse(localStorage.Authorization).subjects.map((data)=>{
                           return<option value={data.code}>{data.name}</option>
                        })}
                    </select>
                <div id="abstractrep">
                   <AbstractAttendance report={abstractReport}/>
                </div>

                <div id="detailedrep">
                   <DetailedAttendance report={detailedReport}/>
                </div>

            </div>
            <div id="marksrep">
            Select Subject<br/>
                <select onChange={(e)=>{getReport(1,"iamarks",setIaReport);
                (e.target.value == "0")?show("marksrep",['iareport','examreport']):show("iareport",['examreport']);
                }}>
                    <option value="0">Select Subject</option>
                   {JSON.parse(localStorage.Authorization).subjects.map((data)=>{
                    return <option value={data.code}>{data.name}</option>
                   })}
                </select>
                <div id="iareport">
                    <IAReport report={iaReport} />
                </div>
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