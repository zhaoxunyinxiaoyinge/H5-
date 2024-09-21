(function(){
    function getRem(){
        let initFontSize=37.5;
        let initWidth=375;
        let width=document.documentElement.clientWidth||initWidth;
        document.documentElement.style.fontSize=width/initWidth*initFontSize+'px'
    }
    getRem();
    window.addEventListener('resize',getRem);
})()