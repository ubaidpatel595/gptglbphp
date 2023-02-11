
function Syllabus(){
    var styl ={width:"100%",height:"500px",border:"none",marginLeft:"100px"}

    const a = ()=>{
        switch(JSON.parse(localStorage.Authorization).sem){
    
            case 1:
                return  <iframe src="/images/firstyearcs.pdf?#view=FitH" style={styl} 
                id="syllabus_frame" title="syllabus"></iframe>
            case 2:
                return  <iframe src="/images/firstyearcs.pdf?#view=FitH" style={styl} 
                id="syllabus_frame" title="syllabus"></iframe>
            case 3:
                return <iframe src="/images/secondyearcs.pdf?#view=FitH" style={styl} 
                id="syllabus_frame" title="syllabus"></iframe>
            case 4:
                return <iframe src="/images/secondyearcs.pdf?#view=FitH" style={styl} 
                id="syllabus_frame" title="syllabus"></iframe>
            case 5 :
                return <iframe src="/images/thirdyearcs.pdf?#view=FitH" style={styl} 
                id="syllabus_frame" title="syllabus"></iframe>
            case 6 :
                return <iframe src="/images/thirdyearcs.pdf?#view=FitH" style={styl} 
                id="syllabus_frame" title="syllabus"></iframe>
            default:
                return <iframe style={styl} 
                id="syllabus_frame" title="syllabus">Something Went Wrong</iframe>
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