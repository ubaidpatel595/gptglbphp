import "./Css/carousel.css"
var count = 1 ;
function change_image(direction,id){
    if(document.getElementById(id)){
        if (direction === 1){
            if(count < 5){
                let img  = document.getElementById(id);
                img.setAttribute("src",`images/${count+1}.jpg`)
                count +=1;
            }else{
                count = 0;
                let img  = document.getElementById(id);
                img.setAttribute("src",`images/${count+1}.jpg`)
                count +=1;
            }
        }else{
            if(count > 1){
                let img  = document.getElementById(id);
                img.setAttribute("src",`images/${count-1}.jpg`)
                count -=1;
            }else{
                count = 6;
                let img  = document.getElementById(id);
                img.setAttribute("src",`images/${count-1}.jpg`)
                count -=1;
            }
        }
    }
}
function Carousel(){
    return(
        <div id="carousel">
            <span id="prev-btn" onClick={()=>{change_image(-1,"carousel_image")}}>❮</span> 
            <span id="next-btn" onClick={()=>{change_image(1,"carousel_image")}}>❯</span>
            <img src="images/1.jpg" alt="" id="carousel_image"/>
            <div style={{display:"none"}}>{setTimeout(()=>{setInterval(change_image,5000,1,"carousel_image")},5000)}</div>
        </div>
    )
}
export default Carousel;