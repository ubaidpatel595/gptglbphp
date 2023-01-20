import "../Css/hod.css";
import Syllabus from "../../Apis/Syllabus";
import Reports from "../../Apis/Reports";
function show(elem,hide){
    let opt = document.getElementById(elem);
    opt.style="display:block";
    for(let x in hide){
        let opt = document.getElementById(hide[x]);
        opt.style="display:none";
    }
}

function Student(){
    return(
        <div id="actions">
            <div class="flex" style={{margin:"0px"}}>
                <div id="act-btns">
                    <button onClick={()=>{show('action',['gen_reports','upload','upload_opts'])}}>Attendence Report</button><br/>
                    <button onClick={()=>{show('gen_reports',['upload','action','upload_opts'])}}>Marks Reports</button>  <br/> 
                    <button onClick={()=>{show('upload',['action','gen_reports','upload_opts'])}}>Syllabus</button><br/>
                </div>
                <div id="action"><Reports type="Attendance"/></div>
                <div id="gen_reports">
                    <button>Cie Marks</button><br/>
                    <button>See Results</button><br/>
                </div>
                <div id="upload">
                    <button onClick={()=>{show('upload_opts')}}>Show Syallabus </button><br/>
                </div>
               <div id="upload_opts"><Syllabus/></div>
            </div>
        </div>
    )
}
export default Student;