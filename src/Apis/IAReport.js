function IAReport({report}){
    return(
        <table>
                        <thead>
                            <tr><th>Name</th><th>Reg no.</th><th>IA 1</th><th>IA 2</th><th>IA 3</th><th>IA 4</th><th>IA 5</th></tr>
                        </thead>
                        <tbody>
                            {
                                JSON.parse(report).map((data)=>{
                                    return<tr>
                                        <td>{data.name}</td>
                                        <td>{data.reg}</td>
                                        <td>{data.marks[0]}</td>
                                        <td>{data.marks[1]}</td>
                                        <td>{data.marks[2]}</td>
                                        <td>{data.marks[3]}</td>
                                        <td>{data.marks[4]}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
    )
}
export default IAReport;