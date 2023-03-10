import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';


var type;
function change_usertype(typ){
    let elem = document.getElementById("user_id");
    type=typ;
    if(typ=="STUDENT"){
        document.getElementById("semselect").style="display:";
        elem.innerHTML="Reg No:"

    }else{
        document.getElementById("semselect").style="display:none";
        elem.innerHTML="Emp Id:"
    }
}

//Form Handling And User Registration Through Api
//Used React-Hook-From Hook For The Task
function signup(data,nav,auth){
    let user_name = data.userid
    let mobile = data.mobile
    let email = data.email
    let password = data.password
    let fullname = data.fullname
    let sem = data.sem

    //Sending Parameters in UrlEncoded From
    let params = `userid=${user_name}&fullname=${fullname}&mobile=${mobile}&email=${email}&userPassword=${password}&userRole=${type}&branch=${data.branch}&sem=${sem}`;
    let ajax = new XMLHttpRequest();
    ajax.onload=()=>{
        let response = ajax.responseText;
        let elem = document.getElementById("result");
        //console.log(response)
        if(response == "1"){
            elem.innerHTML = "Success";
            elem.style="margin:0px";
            auth(data,nav);
            //setTimeout(()=>{nav("/")},1300)
        }else{
            elem.innerHTML = "User Already Exists";
            elem.style="margin:0px";
        }
    };
    ajax.open("POST","localhost:3001/api/Register");
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send(`${params}`)
    //alert(params)
}

//Siginin User After Signup
function authenticate(data,nav){
    //Sending Parameters in UrlEncoded From
    let params = `mobile=${data.mobile}&password=${data.password}`;
    let ajax = new XMLHttpRequest();
    ajax.onload=()=>{
    let response = ajax.responseText;
    localStorage.setItem("Authorization",response);
     if (JSON.parse(response).auth == "true"){
      let elem = document.getElementById("result");
     // console.log(JSON.parse(response).type)
      elem.innerHTML="Success";elem.style="margin:0px";
      setTimeout(()=>{nav("/"+JSON.parse(response).type)},1000)
     }
    }
    ajax.open("POST","/api/Authenticate");
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send(`${params}`)
}

//This is The Register Component
function Register(){
    const Navigate = useNavigate();
    const signup_params = (data) => {signup(data,Navigate,authenticate)};

    //React Form Hook Register is the object To Store Form Elemnts
    //Handle Submit is a method for fromhandling
    const { register, handleSubmit } = useForm();
    return(
        <div id="login-form">
            <h4 id="result"></h4>
            <form onSubmit={handleSubmit(signup_params)}>
                <table>
                    <tr>
                        <td>Student: <input type="radio" name="type" {...register("type")} required onChange={()=>{change_usertype("STUDENT")}}/></td>
                        <td>Faculty: <input type="radio" name="type" required onChange={()=>{change_usertype("FACULTY")}}/></td>
                    </tr>
                    <tr>
                        <td id="user_id">Reg No:</td>
                        <td><input type="text"  {...register("userid")} required name="userid"/></td>
                    </tr>
                    <tr>
                        <td >Branch:</td>
                        <td id="branchopt"> 
                            <select name="branch" {...register("branch")} required>
                                <option value="CS">Select Branch</option>
                                <option value="CS">CS</option>
                                <option value="IS">IS</option>
                                <option value="ME">ME</option>
                                <option value="EC">EC</option>
                                <option value="EE">EE</option>
                                <option value="CIVIL">CIVIL</option>
                            </select>
                        </td>
                    </tr>
                    <tr id="semselect">
                        <td >Sem:</td>
                        <td  style={{textAlign:"center"}}> 
                            <select {...register("sem")} name="sem" >
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
                        <td>Full name:</td>
                        <td><input type="text"  {...register("fullname")} required name="fullname"/></td>
                    </tr>
                    <tr>
                        <td>Mobile:</td>
                        <td><input type="text"  {...register("mobile")} required name="mobile"/></td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td><input type="text"  {...register("email")} required name="email"/></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type="text"  {...register("password")} required name="password"/></td>
                    </tr>
                </table>
                <button type="submit" name="login" id="submit-button" >Signup</button>
            </form>
        </div>
    )
}
export default Register;