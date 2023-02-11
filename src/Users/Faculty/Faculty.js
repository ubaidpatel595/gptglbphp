import "../Css/hod.css";
import Upload from "../../Apis/Upload";
import Attendance from "../../Apis/Attendance";
import MarkAttendance from "../../Apis/markAttendance";
import ModifyAttendance from "../../Apis/modifyAttandance";
import { useState } from "react";
import AbstractAttendance from "../../Apis/AbstractAttendance";
import IAReport from "../../Apis/IAReport";
import { show } from "../Admin/Admin";
import { showEvent } from "../Admin/Admin";

//Getting reports
function getReport(value, type, updaterep) {
    //console.log(value);
    let auth = JSON.parse(localStorage.Authorization);

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            updaterep(this.responseText)
            // console.log(this.responseText);
        }
    });

    let ajax = new XMLHttpRequest();
    ajax.onload = () => {
        //       console.log(ajax.responseText)
        updaterep(ajax.responseText)
    }
    if (type === "abstract") {
        xhr.open("POST", "http://localhost:3001/api/AbstractAttendance?subject=" + value +
            "&token=" + auth.token + "&userid=" + auth.userid);
        xhr.send();
    } else if (type === "detailed") {
        xhr.open("POST", "http://localhost:3001/api/DetailedAttendance?&subject=" + value +
            "&token=" + auth.token + "&userid=" + auth.userid);
        xhr.send();
    } else if (type === "iamarks") {
        xhr.open("POST", "http://localhost:3001/api/IAMarks?token=" + auth.token + "&userid=" + auth.userid + "&subject=" + value);
        xhr.send();
    }
}

function savePdf(id) {
    let style = `table,th,td{text-align: center;
    border: 1px solid;
    border-collapse: collapse;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 20px;}`;
    let ele = document.getElementById(id);
    var openWindow = window.open("", "title", "attributes");
    openWindow.document.write(`
        <html>
        <head>
        <style>
        ${style}
        </style>
        </head>
        <body>
        <div>${ele.innerHTML}</div>
        </body>
        </html>
        `);
    openWindow.document.close();
    openWindow.focus();
    openWindow.print();
    openWindow.save()
    openWindow.close();
}
function Faculty() {
    const [abstractReport, setAbstractReport] = useState('[{"name":"Ubaid","reg":"109CS20058","present":20,"absent":10}]')
    const [iaReport, setIaReport] = useState('[{"reg":"109CS20058","name":"Ubaid","marks":[22,21,23,45,32]}]')
    return (
        <div id="actions">
            <div className="flex" style={{ margin: "0px" }}>
                <div id="act-btns">
                    <button className="buttons" onClick={(e) => { showEvent(e,'markAttendance', ['marksrep', 'attendrep', 'ModifyAttendance', 'gen_reports', 'upload', 'upload_opts']) }}>Mark Attendance</button><br />
                    <button className="buttons" onClick={(e) => { showEvent(e,'ModifyAttendance', ['marksrep', 'attendrep', 'markAttendance', 'gen_reports', 'upload', 'upload_opts']) }}>Modify Attendance</button><br />
                    <button className="buttons" onClick={(e) => { showEvent(e,'gen_reports', ['marksrep', 'attendrep', 'ModifyAttendance', 'markAttendance', 'upload', 'action', 'upload_opts']) }}>Generate Reports</button>  <br />
                    <button className="buttons" onClick={(e) => { showEvent(e,'upload', ['marksrep', 'attendrep', 'ModifyAttendance', 'markAttendance', 'gen_reports', 'upload_opts']) }}>Upload</button><br />
                </div>
                <div id="action"><Attendance /></div>
                <div id="markAttendance"><MarkAttendance /></div>
                <div id="ModifyAttendance"><ModifyAttendance /></div>
                <div id="gen_reports">
                    <button className="actButtons"
                        onClick={(e) => { showEvent(e,'attendrep', ['marksrep', 'upload', 'ModifyAttendance', 'markAttendance', 'upload_opts']) }}
                    >Attendance</button><br />
                    <button className="actButtons"
                        onClick={(e) => { showEvent(e,'marksrep', ['upload', 'attendrep', 'ModifyAttendance', 'markAttendance', 'upload_opts']) }}
                    >Marks</button><br />
                </div>

                <div id="attendrep" className="hidescroll">
                    <select onChange={(e) => {
                        if (e.target.value === "0") {
                            show('gen_reports', ['report'])
                        } else {
                            show('report', [])
                            getReport(e.target.value, "abstract", setAbstractReport)
                        }
                    }}>
                        <option value="0">Select Subject</option>
                        {JSON.parse(localStorage.Authorization).subjects.map((data) => {
                            return <option value={data.code}>{data.name}</option>
                        })}
                    </select>
                    <button style={{ marginLeft: "20px" }} onClick={(e) => { savePdf("report") }}>Save as pdf</button>
                    <div id="report" className="oneReport hidescroll" >
                        <AbstractAttendance report={abstractReport} />
                    </div>
                </div>
                <div id="marksrep" className="hidescroll">
                    Select Subject<br />
                    <select onChange={(e) => {
                        getReport(e.target.value, "iamarks", setIaReport);
                        (e.target.value === "0") ? show("marksrep", ['iareport', 'examreport']) : show("iareport", []);
                    }}>
                        <option value="0">Select Subject</option>
                        {JSON.parse(localStorage.Authorization).subjects.map((data) => {
                            return <option value={data.code}>{data.name}</option>
                        })}
                    </select>  <button style={{ marginLeft: "20px" }} onClick={(e) => { savePdf("iareport") }}>Save as pdf</button>
                    <div id="iareport">
                        <IAReport report={iaReport} />
                    </div>
                </div>

                <div id="upload">
                    <button className="actButtons" onClick={(e) => { showEvent(e,'upload_opts') }}>IA Marks</button><br />
                </div>
                <div id="upload_opts" ><Upload type="iaMarks" /></div>
            </div>
        </div>
    )
}
export default Faculty;
export { savePdf };