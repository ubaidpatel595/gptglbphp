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
                     <td>{data.subject}</td>
                     <td>{data.present}</td>
                     <td>{data.absent}</td>
                     <td>{data.present+data.absent}</td>
                     <td>{Math.round(data.present*100/(data.absent+data.present))}</td>
                     </tr>
                })}
            </tbody>
        </table>
    )
}
export default AbstractAttendance;