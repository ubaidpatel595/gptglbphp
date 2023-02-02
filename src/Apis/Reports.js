import { useState } from "react";
function Reports({type}){
    //alert(type)
    const [rep,setrep] = useState('[{"date":"notloaded","subject":"not Loaded","state":"ABSENT"}]');
    const [absrep,setabsrep]=useState('[10,20]')
    var atdr = [{date:"aa",subject:"b"}];
function viewfilter(){
    if(type = "Attendance"){
        let ajax = new XMLHttpRequest();
        let token = JSON.parse(localStorage.Authorization);
        ajax.open("POST",`http://127.0.0.1:3001/api/AttendanceReport`)
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        let params = `userid=${token.userid}&token=${token.token}`;
        ajax.send(params);
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
            setabsrep(JSON.stringify(classcount))
           setrep(ajax.responseText)
        }        
        }
    }
viewfilter()
let arrabsrep = JSON.parse(absrep);
let repstyl = {height:"60vh",overflowY:"auto"}
    return(
        <>
        <div style={repstyl} className="hidescroll">
        <table>
        <tbody>
            <tr><th colSpan={3}>{`Present :${arrabsrep[0]}  Absent : ${arrabsrep[1]} Total : ${arrabsrep[0]+arrabsrep[1]}`}</th></tr>
            <tr><th>Date</th><th>Subject</th><th>State</th></tr>
            {
            JSON.parse(rep).map((val)=>{
               return <tr><td>{val.date}</td><td>{val.subject}</td><td>{val.state}</td></tr>
            })                 
                }
            </tbody>
        </table>
        </div>
        </>
    )
}
export default Reports;