function AttendanceShortage({report}){
    return(    
                <table>
                <tbody>
                            {//Displaying  Shortage OF Attendance
                                JSON.parse(report).map((data)=>{
                              return<tr>
                                    <td>
                                    <table>
                                    <thead>
                                        <tr><th colSpan={6} style={{textAlign:"center"}} >Reg no {data.reg} , Name : {data.name}</th></tr>
                                        <tr>
                                        <th>Subject</th><th>Present</th><th>Absent</th><th>Total</th><th>Perc</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.subjects.map((sub)=>{
                                      return<tr>
                                            <td>{sub.subject}</td>
                                            <td>{sub.present}</td>
                                            <td>{sub.absent}</td>
                                            <td>{sub.total}</td>
                                            <td>{sub.perc}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                                </td>
                                </tr>
                                })
                            }
                       
                </tbody>
            </table>
    )
}
export default AttendanceShortage;