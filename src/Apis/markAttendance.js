import "./assign.css";
import "../Home/Css/login.css";
import {useForm} from "react-hook-form";
import { useState } from "react";

function getStudent(sem,listupdate){
    let auth = JSON.parse(localStorage.Authorization);
    let userid = auth.userid;
    let token = auth.token;
   // alert(userid)
    let ajax  = new XMLHttpRequest();
    ajax.open("POST","http://localhost/newphp/api/getStudent.php");
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    ajax.onload=function (){
        listupdate(JSON.parse(this.responseText))
        localStorage.studentList=this.responseText;
        // alert("Loaded");
        console.log(JSON.parse(this.responseText))
    }
    let params = `userid=${userid}&token=${token}&sem=${sem}`;
    ajax.send(params);
}
  
const updateType=(e)=>{
    let typ = e.target.value;
    if( typ === "allpresent" || typ ==="allabsent"){
        document.getElementById("tickstudent").style="display:none"
        document.getElementById("studentlist").style="display:none"
    }else{
      document.getElementById("tickstudent").style="display:;text-align:center"
      document.getElementById("studentlist").style="display:;" 
    }

}
const finalizeattend=(list)=>{
    let type = document.getElementById("attendancetype").value;
    if(type === "somepresent"){
        let query = "INSERT INTO attendance (subject,teacher,student,state) values";
        for (let x in list){
            alert(document.getElementById(list[x].reg).checked)
            let hq = `('$','109NS','109CS20058','PRESENT')`
            // alert(document.getElementById("attendancetype").value)
        } 

        //alert(" Some Present")
    }else if(type === "someabsent"){
       // alert(" Some Absent")
    }else if(type === "allpresent"){
       // alert(" All Present")
    }else{
        //alert("All Absent")
    }   
}

function AssignSub(){
    const [studentlist,updateList] = useState([{reg:"not loaded",name:"not loaded",sem:"0"}])  
     
    return(
        <>
        {/* <h1>Hello World</h1> */}
        <div id="login-form">
            <h4 id="result"></h4>
            <form >
                <table>
                    <tr>
                        <td>Sem:</td>
                        <td> 
                            <select name="sem" onChange={(e)=>{getStudent(e.target.value,updateList)}}>
                                <option value="1">Select Sem</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Type:</td>
                        <td> 
                            <select name="type" id="attendancetype" onChange={updateType} >
                                <option value="1">Select Type</option>
                                <option value="allpresent">All Present</option>
                                <option value="allabsent">All Absent</option>
                                <option value="somepresent">Some Present</option>
                                <option value="someabsent">Some Absent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <td colSpan={2} id="tickstudent" style={{textAlign:"center",display:"none"}}> Tick Students:</td></tr>
                    <tr>
                        <td colSpan={2} id="studentlist" style={{display:"none"}}> 
                            <table className="studenttable">
                                <tr>
                                    <td>Name</td>
                                    <td>Reg no</td>
                                    <td>Attendance</td>
                                </tr>
                                {
                                  studentlist.map((data)=>{
                                    return(
                                        <tr>
                                            <td>{data.name}</td>
                                            <td>{data.reg}</td>
                                            <td><input type="checkbox" id={data.reg}/></td>
                                        </tr>
                                    )
                                  })
                                }
                            </table>
                        </td>
                    </tr>
                </table>
                <button type="button" name="login" id="submit-button" onClick={()=>{finalizeattend(studentlist)}}>Assign</button>
            </form>
        </div>
        </>
    )
}
export default AssignSub;