function MarksReport({report}){
    return(
        <div id="marksReportHod" className="largeTable hidescroll">
                    {//Displaying  Shortage OF Attendance
                        JSON.parse(report).map((data)=>{
                      return<table>
                            <thead>
                                <tr><th colSpan={6} style={{textAlign:"center"}} >Reg no {data.reg} , Name : {data.name}</th></tr>
                                <tr>
                                <th>Subject</th><th>Code</th><th>IA</th><th>Exam</th><th>Total</th><th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.subjects.map((sub)=>{
                              return<tr>
                                    <td>{sub.subject}</td>
                                    <td>{sub.code}</td>
                                    <td>{sub.ia}</td>
                                    <td>{sub.exam}</td>
                                    <td>{sub.ia+sub.exam}</td>
                                    <td>{((sub.ia+sub.exam) > 30 )?"Pass":"Fail"}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        })
                    }
               
               </div>
    )
}
export default MarksReport;