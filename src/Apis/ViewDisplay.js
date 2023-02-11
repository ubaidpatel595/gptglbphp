import '../Users/Css/hod.css'
import'../Home/Css/login.css'
function ViewDisplay({getData,data,setData,type}){
    if(type === 'student'){
        return(

            <> 
            <select id="branchSelect" style={{marginTop:"40px",marginLeft:"40px"}}>
                 <option value="0">Select Branch</option>
                     <option value="CS">CS</option>
                     <option value="IS">IS</option>
                     <option value="EC">EC</option>
                     <option value="EE">EE</option>
                     <option value="CV">CV</option>
                     <option value="ME">ME</option>
                 </select><br/>
                 <select onChange={(e)=>{getData(e.target.value,setData)}} style={{marginLeft:"40px"}}>
                 <option value="0">Select Sem</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                     <option value="6">6</option>
                 </select>
            <div className='oneReport largeTable hidescroll blueBackground' style={{marginTop:"10px",height:"350px"}}>
                 <table>
                     <thead>
                         <tr><th>Reg</th><th>Name</th><th>Sem</th><th>Mobile</th><th>Email</th></tr>
                     </thead>
                     <tbody>
                         {JSON.parse(data).map((data)=>{
                             return<tr><td>{data.reg}</td><td>{data.name}</td><td>{data.sem}</td><td>{data.mobile}</td><td>{data.email}</td></tr>
                         })}
                     </tbody>
                 </table>
             </div></>
         )
    }else{
        return(
            <> 
            <select id="branchSelect" style={{marginTop:"40px",marginLeft:"40px"}} onChange={(e)=>{getData(e.target.value,setData)}} >
                 <option value="0">Select Branch</option>
                     <option value="CS">CS</option>
                     <option value="IS">IS</option>
                     <option value="EC">EC</option>
                     <option value="EE">EE</option>
                     <option value="CV">CV</option>
                     <option value="ME">ME</option>
                 </select><br/>
                 <div className='oneReport largeTable hidescroll blueBackground' style={{marginTop:"10px",height:"350px"}}>
                 <table>
                     <thead>
                         <tr><th>Userid</th><th>Name</th><th>Mobile</th><th>Email</th></tr>
                     </thead>
                     <tbody>
                         {JSON.parse(data).map((data)=>{
                             return<tr><td>{data.userid}</td><td>{data.name}</td><td>{data.mobile}</td><td>{data.email}</td></tr>
                         })}
                     </tbody>
                 </table>
             </div></>
         )
    }
    
}
export default ViewDisplay