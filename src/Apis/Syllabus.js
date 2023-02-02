import { useEffect } from "react"

function Syllabus(){
    var styl ={width:"100%",height:"500px",border:"none",marginLeft:"100px"}

    const a = ()=>{
        switch(JSON.parse(localStorage.Authorization).sem){
    
            case "1":
                return  <iframe src="/images/firstyearcs.pdf?#view=FitH" style={styl} 
                id="syllabus_frame"></iframe>
            case "3":
                return <iframe src="/images/secondyearcs.pdf?#view=FitH" style={styl} 
                id="syllabus_frame"></iframe>
            case "5" :
                return <iframe src="/images/thirdyearcs.pdf?#view=FitH" style={styl} 
                id="syllabus_frame"></iframe>
        }}

    return(
        <>
      {
        a()
      }
        </>
    )
}
export default Syllabus;