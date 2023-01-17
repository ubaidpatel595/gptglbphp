import { useNavigate } from "react-router-dom";

function Logout(){
    const  Navigate = useNavigate();
    localStorage.setItem("Authorization",'{"auth":"False"}');
    setTimeout(()=>{Navigate("/")},0);
    return(
        <h1></h1>
    )
}
export default Logout;