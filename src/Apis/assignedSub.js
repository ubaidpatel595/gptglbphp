import "../Users/Css/assignedsub.css"

function getAssigned(){
  const xhttp = new XMLHttpRequest();
  let Auth = JSON.parse(localStorage.Authorization);
  let params = `userid=${Auth.userid}&token=${Auth.token}`;
  xhttp.onload = function() {
    localStorage.setItem("assignedSubs",xhttp.responseText)
    }
  xhttp.open("POST", "http://127.0.0.1/newphp/api/assignedsub.php");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);

}
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
function AssignedSub(){
    let sublist = JSON.parse(localStorage.assignedSubs);
    getAssigned()
    return(
        <>
        <div className="assignedsub" id="a">
        <h1>Assigned Subjects</h1>
        <table>
            <tr><th>Subject</th><th>Teacher</th><th>Sem</th></tr>
            {sublist.map(
                (data)=><tr><td>{data.sub}</td><td>{data.teacher}</td><td>{data.sem}</td></tr>
            )}
        </table>
        </div>
        <button id="submit-button" onClick={()=>{printInfo()}}>Save</button>
        </>
    )
}
export default AssignedSub;