import { useEffect } from "react";

function show(elem,hide){
    let opt = document.getElementById(elem);
    opt.style="display:block";
    for(let x in hide){
        let opt = document.getElementById(hide[x]);
        opt.style="display:none";
    }
}

function uploadFile(e,type){
    let value;
    if(type === "iaMarks"){
        value = document.getElementById("subOpts").value;
    }else if(type === "semMarks"){
        value = document.getElementById("semOpts").value;
    }else{
        value = "0";
    }
    let auth = JSON.parse(localStorage.Authorization);
    let data = new FormData();
    let fileInput = document.getElementById("fileinput")
     data.append("file", fileInput.files[0], fileInput.files[0].name);
     var xhr = new XMLHttpRequest();
     xhr.withCredentials = true;
     xhr.addEventListener("readystatechange", function() {
       if(this.readyState === 4) {
        if(this.responseText === "1"){
            show('filestatus',['form'])
            document.getElementById("filestatus").style="color:green";
        }
         //console.log(this.responseText);
       }
     });
     xhr.open("POST", "http://localhost:3001/api/Upload?token="+auth.token+"&userid="+auth.userid+"&type="+type+"&value="+value);
     xhr.send(data);
       e.preventDefault()
    //   console.log(fileInput.files[0])
}
function typeFilter(type){
    if(type === "iaMarks"){
        show('iaMarks',['semMarks','student','faculty'])
    }else if(type === "semMarks"){
        show('semMarks',['iaMarks','student','faculty'])
    }else if(type === "student"){
        show('student',['iaMarks','semMarks','faculty'])
        show('form',[])
    }else if(type === "faculty"){
        show('faculty',['iaMarks','semMarks','student'])
        show('form',[])
    }
}
function Upload({type}){
    useEffect(()=>{
        //alert(type)
        typeFilter(type)
    })
    return(
        <>
        <center>

            <div id="iaMarks" style={{display:"none"}}>
            <h4 className="center" style={{color:"rgb(255, 105, 105)"}}>iaMarks List Should Be .xlsx File in Below Format</h4>
            <table className="table" style={{margin:"auto"}} >
            <tbody>
                <tr>
                    <td>reg</td>
                    <td>ia1</td>
                    <td>ia2</td>
                    <td>ia3</td>
                    <td>ia4</td>
                    <td>ia5</td>
                </tr>
                <tr>
                    <td>109CS2**01</td>
                    <td>12</td>
                    <td>11</td>
                    <td>14</td>
                    <td>17</td>
                    <td>19</td>
                </tr>
            </tbody>
           </table><br/>
           <p style={{color:"rgb(255, 105, 105)"}} className="center">
               (reg column is mandatory) (ia1,ia2,ia3,ia4,ia5 columns are optional)
               <a href="images/IAMarks.xlsx" download="" style={{color:"blue"}}>Clik Here to Download Example</a>
            </p>
            <select onChange={
                (e)=>{
                    (e.target.value === "0")?show('upload_opts',['form','filestatus']):show('form',[])
                }
            } id="subOpts">
                <option value="0">Select Subject</option>
                {JSON.parse(localStorage.Authorization).subjects.map((data)=>{
                    return<option value={data.code}>{data.name}</option>
                })}
            </select><br/><br/>
            </div>
        
            <div id="semMarks" style={{display:"none"}}>
            <h4 className="center" style={{color:"rgb(255, 105, 105)"}}>MarksReport List Should Be .xlsx File in Below Format</h4>
            <table className="table" style={{margin:"auto"}} >
            <tbody>
            <tr>
                    <td>reg</td>
                    <td>subject</td>
                    <td>subCode</td>
                    <td>ia</td>
                    <td>exam</td>
                </tr>
                <tr>
                    <td>109CS2**01</td>
                    <td>Fundamentals of comp</td>
                    <td>20CS11T</td>
                    <td>14</td>
                    <td>17</td>
                </tr>
            </tbody>
           </table><br/>
           <p style={{color:"rgb(255, 105, 105)"}} className="center">
               (All fields are Mandatory)
               <a href="images/semMarks.xlsx" download="" style={{color:"blue"}}>Clik Here to Download Example</a>
            </p>
            <select onChange={
                (e)=>{
                    (e.target.value === "0")?show('upload_opts',['form','filestatus']):show('form',[])
                }
            } id="semOpts">
                <option value="0">Select Sem</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select><br/><br/>
            </div>

            <div id="student" style={{display:"none"}}>
            <h4 className="center" style={{color:"rgb(255, 105, 105)"}}>Student List Should Be .xlsx File in Below Format</h4>
            <table className="table" style={{margin:"auto"}} >
            <tbody>
            <tr>
                    <td>reg</td>
                    <td>name</td>
                    <td>email</td>
                    <td>mobile</td>
                    <td>password</td>
                    <td>sem</td>
                </tr>
                <tr>
                    <td>109CS2**01</td>
                    <td>John Doe</td>
                    <td>john595@gmail.com</td>
                    <td>9187491236</td>
                    <td>****</td>
                    <td>1</td>
                </tr>
            </tbody>
           </table><br/>
           <p style={{color:"rgb(255, 105, 105)"}} className="center">
               (reg,mobile,password,sem column is mandatory) (email is optional)
               <a href="images/StudentList.xlsx" download="" style={{color:"blue"}}>Clik Here to Download Example</a>
            </p>
           </div>

           <div id="faculty" style={{display:"none"}}>
            <h4 className="center" style={{color:"rgb(255, 105, 105)"}}>Faculty List Should Be .xlsx file in Below Format</h4>
            <table className="table" style={{margin:"auto"}} >
            <tbody>
            <tr>
                    <td>empid</td>
                    <td>name</td>
                    <td>email</td>
                    <td>mobile</td>
                    <td>password</td>
                    <td>branch</td>
                </tr>
                <tr>
                    <td>109CS2**01</td>
                    <td>John Doe</td>
                    <td>john595@gmail.com</td>
                    <td>9187491236</td>
                    <td>****</td>
                    <td>CS</td>
                </tr>
            </tbody>
           </table><br/>
           <p style={{color:"rgb(255, 105, 105)"}} className="center">
               (All fields are mandatory)
               <a href="images/Faculty.xlsx" download="" style={{color:"blue"}}>Clik Here to Download Example</a>
            </p>
           </div>

            <form className="center hide" id="form" encType="multipart/form-data" onSubmit={(e)=>{uploadFile(e,type)}}>
                <input type="file" name="file" id="fileinput" accept=".xlsx" />
                <button type="submit">Upload</button>
            </form>
            <h1 style={{display:"none"}} id="filestatus">File Upload Successfull</h1>
        </center>
        </>
    )
}
export default Upload;