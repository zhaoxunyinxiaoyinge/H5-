(function(){
    function getRem(){
        let initFontSize=16;
        let initWidth=375;
        let width=document.documentElement.clientWidth||initWidth;
        console.log(width,"width")
        if(width==1920){
            document.documentElement.style.fontSize=16+'px';    
        }else{
            let fontSize=(width/initWidth)*initFontSize;
            document.documentElement.style.fontSize=fontSize+'px';    
        }
    }
    getRem();
    window.addEventListener('resize',getRem);
})()