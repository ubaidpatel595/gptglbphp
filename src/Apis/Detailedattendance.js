
function DetailedAttendance({report}){
    return(
        <table>
            <tbody>
                {
                    JSON.parse(report).map((data)=>{
                        let present = 0;
                        let absent = 0;
                        //console.log(data)
                        for (let i in data.attendance){
                            if(data.attendance[i].state == "PRESENT"){
                                present +=1;
                            }else{
                                absent +=1;
                            }
                        }
                        let perc = 0 ;
                        perc = Math.round(present*100/(absent+present));
                        return<tr>
                        <td> 
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={3}>
                                        Name : {data.name} , Reg:{data.reg} , Present : {present} , Absent : {absent} , Prec : {perc}%</th>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <th>Subject</th>
                                        <th>State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.attendance.map((att)=>{
                                        return<tr>
                                        <td>{att.date}</td>
                                        <td>{att.subject}</td>
                                        <td>{att.state}</td>
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

export default DetailedAttendance;