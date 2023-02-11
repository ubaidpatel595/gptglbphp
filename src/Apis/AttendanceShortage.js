function AttendanceShortage({report}){
    report = JSON.parse(report)
    let prev = "";
    let obj = {reg:"",name:"",subjects:[]}
    let arr = [];
    function convertShort(){
       // let average = report[0].marks.reduce((a,b)=>a+b,0);
        //let subobj = {subject:"",averge:""};
       // console.log(Math.round(average/report[0].marks.length))
       
        for(let i in report ){
            if(report[i].reg === prev){
                    let newobj = arr.pop()
                    let subobj = {
                        subject:report[i].subject,
                        present:report[i].present,
                        absent:report[i].absent,
                        total:report[i].present+report[i].absent,
                        perc:Math.round(report[i].present*100/(report[i].present+report[i].absent)),
                    };
                    newobj.subjects.push(subobj);
                    if(Math.round(report[i].present*100/(report[i].present+report[i].absent))<71){
                        prev = report[i].reg;
                        arr.push(newobj)
                    }
                   }else{
                    let stud = {reg:"",name:"",subjects:[]};
                    stud = {}
                    let subobj = {
                        subject:report[i].subject,
                        present:report[i].present,
                        absent:report[i].absent,
                        total:report[i].total,
                        perc:Math.round(report[i].present*100/(report[i].present+report[i].absent)),
                    };
                    stud.reg = report[i].reg;
                    stud.name = report[i].name;
                    stud.subjects = [];
                    stud.subjects.push(subobj);
                    if(Math.round(report[i].present*100/(report[i].present+report[i].absent))>71){
                        arr.push(stud)
                        prev = report[i].reg;
                    }
                    if(arr.length == 0 ){
                        let obj = {reg:"notFound",name:"No Shortage",subjects:[{subject:"No Shortage of Attendance Found",present:0,absent:0,total:0,perc:0,}]}
                        arr.push(obj)
                    }
                   }
        }}
    convertShort();
    return(    
                <div id="attendShortage" className="largeTable hidescroll">
                            {//Displaying  Shortage OF Attendance
                              arr.map((data)=>{
                              return<table>
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
                                })
                            }
                       
                       </div>
    )
}
export default AttendanceShortage;