function Reports({report,classCnt}){
    classCnt = JSON.parse(classCnt);
let repstyl = {height:"60vh",overflowY:"auto"}
    return(
        <>
        <div id="attrep" style={repstyl} className="hidescroll">
        <table style={{margin:"auto",width:"400px"}}>
        <tbody>
            <tr><th colSpan={3}>{`Present :${classCnt[0]}  Absent : ${classCnt[1]} Total : ${classCnt[0]+classCnt[1]}`}</th></tr>
            <tr><th>Date</th><th>State</th></tr>
            {
            JSON.parse(report).map((val)=>{
               return <tr><td>{val.date}</td><td>{val.state}</td></tr>
            })                 
                }
            </tbody>
        </table>
        </div>
        </>
    )
}
export default Reports;