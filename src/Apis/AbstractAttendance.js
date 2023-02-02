function AbstractAttendance({report}){
    return(
        <table>
            <thead>
                <tr><th>Student</th><th>Reg</th><th>Subject</th><th>Present</th><th>Absent</th><th>Total</th><th>Perc</th></tr>
            </thead>
            <tbody>
                {JSON.parse(report).map((data)=>{
                     return<tr>
                     <td>{data.name}</td>
                     <td>{data.reg}</td>
                     <td>{data.name}</td>
                     <td>{data.present}</td>
                     <td>{data.absent}</td>
                     <td>{data.total}</td>
                     <td>{data.perc}</td>
                     </tr>
                })}
            </tbody>
        </table>
    )
}
export default AbstractAttendance;