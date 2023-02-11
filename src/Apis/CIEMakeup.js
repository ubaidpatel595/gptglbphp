function CIEMakeup({report}){
    report = JSON.parse(report)
    let prev = report[0].reg;
    let obj = {reg:"",name:"",subjects:[]}
    let arr = [];
    function convert(){
       // let average = report[0].marks.reduce((a,b)=>a+b,0);
        //let subobj = {subject:"",averge:""};
       // console.log(Math.round(average/report[0].marks.length))
       
        for(let i in report ){
            let average = report[i].marks.reduce((a,b)=>a+b,0);
            average = Math.round(average/report[0].marks.length);
            if(i === "0"){
                let stud = {reg:"",name:"",subjects:[]};
                let subobj = {subject:report[i].subject,average:average};
                let obj = {reg:"",name:"",subjects:[]}
                stud.reg = report[i].reg;
                stud.name = report[i].name;
                stud.subjects = [];
                stud.subjects.push(subobj)
                prev = report[i].reg;
                arr.push(stud)
                //obj.subjects.push(subobj)
               //console.log(stud)
            }else{
               
            
                
                if(report[i].reg === prev){
                    let newobj = arr.pop()
                    let subobj = {subject:report[i].subject,average:average};
                    newobj.subjects.push(subobj);
                    prev = report[i].reg;
                    arr.push(newobj)
                   }else{
                    console.log(typeof(i))
                    let stud = {reg:"",name:"",subjects:[]};
                    //arr.push(stud)
                    stud = {}
                    let subobj = {subject:report[i].subject,average:average};
                    stud.reg = report[i].reg;
                    stud.name = report[i].name;
                    stud.subjects = [];
                    stud.subjects.push(subobj);
                    arr.push(stud)
                    prev = report[i].reg;
                    console.log(stud)
                   }
        }}
       // console.log(arr)
    }
    convert();
    return(
        <div id="CieMakeupReport" className="largeTable hidescroll">
                            {//Displaying  CIE MAkeup Studnets
                              arr.map((data)=>{
                              return<table>
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
                                })
                            }
                       
                </div>
    )
}
export default CIEMakeup;