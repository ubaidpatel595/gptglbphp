function Courses (){
    let h1Style = {textAlign:"center"};
    let divStyle = {margin:"auto",width:"30%"}
    return(
        <>
         <h1 style={h1Style}>COURSES</h1>
        <div style={divStyle}>
            <ol>
                <li>Mechanical Engineering</li>
                <li>Computer Science Engineering</li>
                <li>Information Science Engineering</li>
                <li>Civil Engineering</li>
                <li>Elictrical & Electronics Engineering</li>
                <li>Elictrical & Comm. Engineering</li>
            </ol>
        </div>
        </>
    )
}
export default Courses;