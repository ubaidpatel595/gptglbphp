import "./Css/login.css"
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";

function authenticate(data,nav){
   //Sending Parameters in UrlEncoded From
   let params = `mobile=${data.mobile}&password=${data.password}`;
   let ajax = new XMLHttpRequest();
   ajax.onload=()=>{
   let response = ajax.responseText;
  // console.log(response)
    if (JSON.parse(response).auth == "true"){
    localStorage.setItem("Authorization",response);
     let elem = document.getElementById("result");
     elem.innerHTML="Success";elem.style="margin:0px";
     setTimeout(()=>{nav("/"+JSON.parse(response).type)},1000)
    }else{
     let elem = document.getElementById("result");
     elem.innerHTML="Invalid Userid Or Password";elem.style="margin:0px";
    }
   }
   ajax.open("POST","http://127.0.0.1:3001/api/Authenticate");
   ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
   ajax.send(`${params}`)

}

function Login(){
    const Navigate = useNavigate();
    const auth_params = (data)=>{authenticate(data,Navigate)}
    //Using React Hook Form
    const {register, handleSubmit} = useForm();
 
    return(
        <div id="login-form">
        <h4 id="result"></h4>
        <form action="" onSubmit={handleSubmit(auth_params)}>
            <table>
                <tr><td>Mobile:</td>
                    <td><input type="text" name="mobile" {...register("mobile") } required /></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type="text" name="password" {...register("password")} required/></td>
                </tr>
            </table>
            <button type="submit" name="login" id="submit-button">Login</button>
        </form>
    </div>
    )
}
export default Login;