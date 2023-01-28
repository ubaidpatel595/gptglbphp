import "./assign.css";
import "../Home/Css/login.css";
import {useForm} from "react-hook-form";

//Getting all Faculty Using Ajx
function getFaculty(){
        const xhttp = new XMLHttpRequest();
        let Auth = JSON.parse(localStorage.Authorization);
        let params = `userid=${Auth.userid}&token=${Auth.token}`;
        xhttp.onload = ()=>{
            localStorage.setItem("facultyList",xhttp.responseText)
        };
        xhttp.open("POST", "/api/GetFaculty");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
}

//Getting Subject Using Ajax
function getSubject(sem,listopts){
    const xhttp = new XMLHttpRequest();
    let Auth = JSON.parse(localStorage.Authorization);
    let params = `userid=${Auth.userid}&token=${Auth.token}&sem=${sem}&value=${sem}&type=sem`;
    xhttp.onload = ()=>{
        localStorage.setItem("subjectList",xhttp.responseText)
        listopts()
    };
    xhttp.open("POST", "/api/GetSubject");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}

function listSubs(){
    if(localStorage.subjectList){
        let sublist = JSON.parse(localStorage.subjectList);
        let selec = document.getElementById("subjects");
        selec.innerHTML="";
        let option = document.createElement("option");
        option.text="Select Subject";
        selec.add(option);
        
        if(sublist.length){
            for(let x in sublist){
                let option = document.createElement("option");
                option.text=sublist[x]['name'];
                option.value=sublist[x]['code'];
                selec.add(option);
            }
        }else{
            let option = document.createElement("option");
            option.text="No Subjects";
            option.value="0";
            selec.add(option);
        }
    }
}

function Assign(data) {
    let sub = data.subject;
    let teacher = data.teacher;
    let sem = data.sem;

    let Auth = JSON.parse(localStorage.Authorization);
    let params = `userid=${Auth.userid}&token=${Auth.token}&sub=${sub}&teacher=${teacher}&sem=${sem}&type=sem&value=${sem}&branch=${Auth.branch}`;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if(this.responseText == 1){
            document.getElementById("result").innerHTML = "Subject Has Been Alloted Successfully";
        }else{
            document.getElementById("result").innerHTML = "Subject Has Been Already Alloted";
        }
      

      console.log(this.responseText);
      }
    xhttp.open("POST", "/api/AllotSubject");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
  }

function AssignSub(){
    getFaculty();
    var Facultylist;
    if(localStorage.facultyList){
        Facultylist =(JSON.parse(localStorage.getItem("facultyList")));
    }else{
        Facultylist =[{userid:"noLoaded",name:"notLoaded"}];
    }
    const {register,handleSubmit} = useForm();

    return(
        <>
        <div id="login-form">
            <h4 id="result"></h4>
            <form onSubmit={handleSubmit((data)=>{Assign(data)})} >
                <table>
                    <tbody>
                    <tr>
                        <td>Staff:</td>
                        <td>
                            <select name="teacher" id="staff" {...register("teacher")}>
                                {
                               Facultylist.map(faculty => 
                               <option key={faculty['userid']} value={faculty['userid']} > {faculty['name']} </option>)
                                }        
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Sem:</td>
                        <td> 
                            <select name="sem" {...register("sem")} onChange={(e)=>{getSubject(e.target.value,listSubs);}} >
                                <option key="val" value="1">Select Sem</option>
                                <option key="1" value="1">1</option>
                                <option key="2" value="2">2</option>
                                <option key="3" value="3">3</option>
                                <option key="4" value="4">4</option>
                                <option key="5" value="5">5</option>
                                <option key="6" value="6">6</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                    <td >Sub:</td>
                        <td> 
                        <select id="subjects"  name="subject" style={{textAlign:"left"}} {...register("subject")}>
                            <option>Select Subject</option>
                        </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit" name="login" id="submit-button">Assign</button>
            </form>
        </div>
        </>
    )
}
export default AssignSub;