import Student from "../Users/Student/Student";
import Faculty from "../Users/Faculty/Faculty";
import Hod from "../Users/Hod/Hod";
import Admin from "../Users/Admin/Admin";
function Dashboard(){
    let type = JSON.parse(localStorage.Authorization).type.toUpperCase();
    function filterUser(){
        if(type === "STUDENT"){
            return<><Student/></>;
        }else if(type === "FACULTY"){
            return<><Faculty/></>;
        }else if(type === "HOD"){
            return<><Hod/></>;
        }else if(type === "ADMIN"){
            return<><Admin/></>;
        }
    }
    return(
        filterUser()
    )
}
export default Dashboard;