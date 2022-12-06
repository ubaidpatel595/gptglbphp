import  {NavLink}  from "react-router-dom";
function links(){
    return(
        <div id="links">
            <NavLink to="Student"><button>Student</button></NavLink>
            <NavLink to="Faculty"><button>Faculty</button></NavLink>
            <NavLink to="Hod"><button>HOD</button></NavLink>
            <NavLink to="Admin"><button>Admin</button></NavLink>
        </div>
    )
}
export default links;