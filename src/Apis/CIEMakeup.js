function CIEMakeup({report}){
    return(
        <table>
                <tbody>
                            {//Displaying  CIE MAkeup Studnets
                                JSON.parse(report).map((data)=>{
                              return<tr>
                                    <td>
                                    <table>
                                    <thead>
                                        <tr><th colSpan={5} style={{textAlign:"center"}} >Reg no {data.reg} , Name : {data.name}</th></tr>
                                        <tr>
                                        <th>Subject</th><th>Average</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.subjects.map((sub)=>{
                                      return<tr>
                                            <td>{sub.subject}</td>
                                            <td>{sub.average}</td>
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
export default CIEMakeup;