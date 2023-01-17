import "./assign.css";
import "../Home/Css/login.css";
import {useForm} from "react-hook-form";
function getStudent(sem){
    let auth = JSON.parse(localStorage.Authorization);
    let userid = auth.userid;
    let token = auth.token;
   // alert(userid)
    let ajax  = new XMLHttpRequest();
    ajax.open("POST","http://localhost/newphp/api/getStudent.php");
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    ajax.onload=function (){
        alert("Loaded");
        console.log(this.responseText)
    }
    let params = `userid=${userid}&token=${token}&sem=${sem}`;
    ajax.send(params);
}
  
function AssignSub(){
   getStudent("5")
    return(
        <>
        <h1>Hello World</h1>
        <div id="login-form">
            <h4 id="result"></h4>
            <form >
                <table>
                <tr>
                        <td>Type:</td>
                        <td> 
                            <select name="sem" >
                                <option value="1">Select Type</option>
                                <option value="allp">All Present</option>
                                <option value="alla">All Absent</option>
                                <option value="present">Some Present</option>
                                <option value="absent">Some Absent</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Sem:</td>
                        <td> 
                            <select name="sem" >
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
                    <td > Tick Students:</td>
                        <td> 
                        <select id="subjects"  name="subject" style={{textAlign:"left"}}>
                            <option>Select Subject</option>
                        </select>
                        </td>
                    </tr>
                </table>
                <button type="submit" name="login" id="submit-button">Assign</button>
            </form>
        </div>
        </>
    )
}
export default AssignSub;