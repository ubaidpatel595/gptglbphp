import { useState } from "react";
import "../Css/admin.css";
import Upload from "../../Apis/Upload";
function show(elem,hide){
    let opt = document.getElementById(elem);
    opt.style="display:block";
    for(let x in hide){
        let opt = document.getElementById(hide[x]);
        opt.style="display:none";
    }}
function Admin(){
    const [type,setType]=useState("");
    return(
        <div id="actions">
        <div class="flex" style={{margin:"0px"}}>
            <div id="act-btns">
                <button onClick={()=>{show('upload',['view','delete'])}}>Upload</button><br/>
                <button onClick={()=>{show('view',['upload','delete','action'])}}>View</button>  <br/> 
                <button onClick={()=>{show('delete',['view','upload','action'])}}>Delete</button><br/>
            </div>
            <div id="upload">
                <button onClick={()=>{show('action');setType("Student") }}>Student</button><br/>
                <button onClick={()=>{show('action');setType("Faculty") }}>Faculty</button>
            </div>
            <div id="view">
                <button>Cs Students</button><br/>
                <button>Is Students</button><br/>
                <button>Me Students</button><br/>
                <button>Civil Students</button><br/>
                <button>EE Students</button><br/>
                <button>Ec Students</button><br/>
            </div>
            <div id="delete">
                <button>Delete </button><br/>
                <button>Is Students</button><br/>
                <button>Me Students</button><br/>
                <button>Civil Students</button><br/>
                <button>EE Students</button><br/>
                <button>Ec Students</button><br/>
            </div>
           <div id="action">
            <Upload type={type}/>
           </div>
        </div>
    </div>
    )
}
export default Admin;