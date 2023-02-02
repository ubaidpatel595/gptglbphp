import "../Css/hod.css";
import Syllabus from "../../Apis/Syllabus";
import Reports from "../../Apis/Reports";
import { useState } from "react";

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
function getCieReport(cie,updatecie){
    let elem = document.getElementById("CieReport");
    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:3000/getciereport");
    ajax.onload = ()=>{
        console.log(ajax.responseText)
        updatecie(ajax.responseText)
    }
    ajax.send()
}

//Getting See Exam Report Ajax Call
function getSeeReport(sem,updatesee){
    let elem = document.getElementById("CieReport");
    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:3000/getSeeReport");
    ajax.onload = ()=>{
        console.log(ajax.responseText)
        updatesee(ajax.responseText)
    }
    ajax.send()
}

function Student(){
    const [CieReport,SetCieReport] = useState('[{"subject":"notLoaded","marks":"notLoaded"}]');
    const [SeeReport,SetSeeReport] = useState('[{"code":"109CS2S","subject":"Engineering Maths","ia":"20","exam":"40"}]');
    return(
        <div id="actions">
            <div className="flex" style={{margin:"0px"}}>
                <div id="act-btns">
                    <button onClick={()=>{show('action',['SeeReport','CieReport','gen_reports','upload_opts'])}}>Attendence Report</button><br/>
                    <button onClick={()=>{show('gen_reports',['SeeReport','CieReport','upload_opts','action'])}}>Marks Reports</button>  <br/> 
                    <button onClick={()=>{show('upload_opts',['SeeReport','CieReport','action','gen_reports'])}}>Show Syllabus</button><br/>
                </div>
                <div id="action"><Reports type="Attendance"/></div>
                <div id="gen_reports">
                    <button onClick={()=>{show('CieReport',['SeeReport','action','upload_opts']);}}>Cie Marks</button><br/>
                    <button onClick={()=>{show('SeeReport',['CieReport','action','upload_opts']);getSeeReport()}}>See Results</button><br/>
                </div>
               <div id="upload_opts"><Syllabus/></div>
               <div id="CieReport">
                Select CIE<br/>
                <select onChange={(e)=>{getCieReport(e.target.value,SetCieReport)}}>
                    <option value="0">Select Cie</option>
                    <option value="1">Cie 1</option>
                    <option value="2">Cie 2</option>
                    <option value="3">Cie 3</option>
                    <option value="4">Cie 4</option>
                    <option value="5">Cie 5</option>
                </select>
                <div>
                    <table>
                        <thead>
                            <tr><th>Subject</th><th>Marks</th></tr>
                        </thead>
                        <tbody>
                            {JSON.parse(CieReport).map((data)=>{
                               return  <tr>
                               <td>{data.subject}</td><td>{data.marks}</td>
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
                            <th>Code</th><th>Subject</th><th>IA</th><th>Exam</th><th>Total</th><th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                JSON.parse(SeeReport).map((data)=>{
                                    return <tr>
                                    <td>{data.code}</td>
                                    <td>{data.subject}</td>
                                    <td>{data.ia}</td>
                                    <td>{data.exam}</td>
                                    <td>{parseInt(data.ia)+parseInt(data.exam)}</td>
                                    <td>{(data.exam > 30?"Pass":"Fail")}</td>
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