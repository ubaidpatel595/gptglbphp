import "../Css/hod.css";
import Syllabus from "../../Apis/Syllabus";
import Reports from "../../Apis/Reports";
import { useState } from "react";
import DetailedAttendance from "../../Apis/Detailedattendance";
import AbstractAttendance from "../../Apis/AbstractAttendance";
//For Nav Bar Functionality
function show(elem,hide){
    let opt = document.getElementById(elem);
    opt.style="display:block";
    for(let x in hide){
        let opt = document.getElementById(hide[x]);
        opt.style="display:none";
    }
}

//Getting Cie Report Ajax Call
function getCieReport(updatecie){
    let auth = JSON.parse(localStorage.Authorization);
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        updatecie(this.responseText);
        // console.log(this.responseText);
    }
    });
    xhr.open("POST", "http://localhost:3001/api/IAMarks?token="+auth.token+"&userid="+auth.userid);
    xhr.send();
}

//Getting See Exam Report Ajax Call
function getSeeReport(sem,updatesee){
    let auth = JSON.parse(localStorage.Authorization);
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        //console.log(this.responseText);
        updatesee(this.responseText)
    }
    });
    xhr.open("POST", "http://localhost:3001/api/MarksReport?token="
    +auth.token+"&userid="+auth.userid+"&Type="+auth.type+"&sem="+sem);
    xhr.send();
}

//Getting Attendannce Report By Sub
function getAttendanceBySub(type,value,updtAtt){
    let ajax = new XMLHttpRequest();
    let auth = JSON.parse(localStorage.Authorization);
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        //console.log(this.responseText)
        updtAtt(this.responseText)
    }
    });
    if(type == "abstract"){
        xhr.open("POST", "http://localhost:3001/api/AbstractAttendance?reg="+auth.userid+
        "&subject="+value+"&token="+auth.token+"&userid="+auth.userid);
        xhr.send();
    }else if(type == "detailed"){
        console.log("A")
        xhr.open("POST", "http://localhost:3001/api/DetailedAttendance?reg="+auth.userid+
        "&subject="+value+"&token="+auth.token+"&userid="+auth.userid+"&type="+auth.type);
        xhr.send();
    }
    ajax.onload = ()=>{
        //console.log(ajax.responseText)
        let res = JSON.parse(ajax.responseText);
        let classcount = [0,0];
        for(let i in res){
            if(res[i].state == "PRESENT"){
                classcount[0]=classcount[0]+1;
            }else{
                classcount[1]=classcount[1]+1;
            }
        }
        //updtCnt(JSON.stringify(classcount));
        updtAtt(ajax.responseText)
       // setabsrep(JSON.stringify(classcount))
       //setrep(ajax.responseText)
    }        
}

function Student(){
    let typ ="op";
    function setTyp(t){
        typ = t;
    }
    function getTyp(){
        return typ;
    }
    
    const [CieReport,SetCieReport] = useState('[{"reg":"notLoaded","name":"Not Loaded","marks":[0,0,0,0,0],"subject":"Null","code":"null"}]');
    const [SeeReport,SetSeeReport] = useState('[{"reg":"notLoaded","name":"Not Loaded","subjects":[{"name":"Not Loaded","code":"Null","ia":0,"exam":0}]}]');
    const [detailedReport,SetDetailedReport] = useState('[{"name":"Not Loaded","reg":"notLoaded","attendance":[{"date":"Null","state":"Null"}]}]')
    const [abstractReport,setAbstractReport] = useState('[{"name":"Not Loaded","reg":"notLoaded","present":0,"absent":0}]')
    return(
        <div id="actions">
            <div className="flex" style={{margin:"0px"}}>
                <div id="act-btns">
                    <button onClick={()=>{show('action',['SeeReport','CieReport','gen_reports','upload_opts'])}}>Attendence Report</button><br/>
                    <button onClick={()=>{show('gen_reports',['SeeReport','CieReport','upload_opts','action'])}}>Marks Reports</button>  <br/> 
                    <button onClick={()=>{show('upload_opts',['SeeReport','CieReport','action','gen_reports'])}}>Show Syllabus</button><br/>
                </div>
                <div id="action">
                    Select Type <br/>
                    <select id="attendtyp" onChange={
                        (e)=>{
                            if(e.target.value == "0"){
                                show('action',['abstract','detailed'])
                            }else if(e.target.value == "1"){
                                show('detailed',['abstract'])
                            }else{
                                show('abstract',['detailed'])
                            }
                        }
                    }>
                        <option value="0">Select type</option>
                        <option value="1">Detailed Attendance Report</option>
                        <option value="2">Abstract Attendance Report</option>
                    </select><br/>
                    <select onChange={(e)=>{
                        if(document.getElementById("attendtyp").value == "0"){
                            show('action',['abstract','detailed']);  
                        }else if(document.getElementById("attendtyp").value == "1"){
                            getAttendanceBySub("detailed",e.target.value,SetDetailedReport)
                        }else{
                            getAttendanceBySub("abstract",e.target.value,setAbstractReport);
                        }
                        if(e.target.value == "0"){
                            show('action',['abstract','detailed']);
                        }
                    }}>
                        <option value="0">Select Subject</option>
                        {JSON.parse(localStorage.Authorization).subjects.map((data)=>{
                            return(
                                <option value={data.code}>{data.name}</option>
                            )
                        })}
                    </select><br/><br/>
                    <div id="detailed"><DetailedAttendance report={detailedReport}/></div>
                    <div id="abstract"><AbstractAttendance report={abstractReport}/></div>
                    {/* <Reports report={attendance} classCnt={classCnt}/> */}
                </div>
                <div id="gen_reports">
                    <button onClick={()=>{show('CieReport',['SeeReport','action','upload_opts']);getCieReport(SetCieReport)}}>Cie Marks</button><br/>
                    <button onClick={()=>{show('SeeReport',['CieReport','action','upload_opts']);}}>See Results</button><br/>
                </div>
               <div id="upload_opts"><Syllabus/></div>
               <div id="CieReport">
                <div>
                    <table>
                        <thead>
                            <tr><th>Subject</th><th>Code</th>
                            <th>IA 1</th>
                            <th>IA 2</th>
                            <th>IA 3</th>
                            <th>IA 4</th>
                            <th>IA 5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {JSON.parse(CieReport).map((data)=>{
                               return  <tr>
                               <td>{data.subject}</td>
                               <td>{data.code}</td>
                               <td>{data.marks[0]}</td>
                               <td>{data.marks[1]}</td>
                               <td>{data.marks[2]}</td>
                               <td>{data.marks[3]}</td>
                               <td>{data.marks[4]}</td>
                               </tr>
                            })}
                        </tbody>
                    </table>
                </div>
               </div>
               <div id="SeeReport">
               Select SEM <br/>
                <select onChange={(e)=>{getSeeReport(e.target.value,SetSeeReport)}}>
                    <option value="0">Select SEM</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Code</th><th>Subject</th><th>IA</th><th>Exam</th><th>Total</th><th>Remarks</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                JSON.parse(SeeReport)[0].subjects.map((data)=>{
                                    return <tr>
                                    <td>{data.code}</td>
                                    <td>{data.subject}</td>
                                    <td>{data.ia}</td>
                                    <td>{data.exam}</td>
                                    <td>{data.ia+data.exam}</td>
                                    <td>{(data.exam > 29?"Pass":"Fail")}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
               </div>
        </div>
    )
}
export default Student;