import { useState } from "react";
import "../Users/Css/assignedsub.css"

//Save Assigned Subjects PDf
function printInfo() {
   let style = `div{width: 100%;background-color: rgba(119, 164, 185, 0.776);margin-top: 30px;
                border-radius: 20px;text-align: center;padding-top:30px;padding-bottom:30px;}
                div table{text-align: center;margin: auto;border: 1px solid;border-collapse: collapse;}
                div td,div th{min-width: 100px;text-align: center;border-bottom: 1px solid;border-collapse: collapse;}`;
    let ele =document.getElementById("a");
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
    openWindow.close();
}


function AssignedSub({dummy}){

    //Array Of Assigned Subjects
    const [sublist,updtsublist] = useState(JSON.stringify([{sub:"in stat",teacher:"notLoaded",sem:"0"}]));

    //Get Details Of Assigned Subjects Via Ajax
    function getAssigned(){
        const xhttp = new XMLHttpRequest();
        let Auth = JSON.parse(localStorage.Authorization);
        let params = `userid=${Auth.userid}&token=${Auth.token}`;

        xhttp.onload = function() {
        updtsublist(this.responseText)
        }
        xhttp.open("POST", "/api/AssignedSubs");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
    }

    window.onload = getAssigned();
    return(
        <>
        <div style={{display:"none"}}>{}</div>
        <div className="assignedsub" id="a">
        <h1>Assigned Subjects</h1>
        <table>
            <tbody>
            <tr><th>Subject</th><th>Teacher</th><th>Sem</th></tr>
            {JSON.parse(sublist).map(
                (data)=><tr key={data.sub+data.teacher}><td>{data.sub}</td><td>{data.teacher}</td><td>{data.sem}</td></tr>
            )}
            </tbody>
        </table>
        </div>
        <button id="submit-button" onClick={()=>{printInfo()}}>Save</button>
        </>
    )
}
export default AssignedSub;