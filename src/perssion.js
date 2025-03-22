import {router} from "@/router/index";
// import cookies  from "js-cookies"

router.beforeEach(async(to,from,next)=>{
    console.log(from,"to");
    // if(!cookies.getItem("token")){
    //     //token 存在要判断是否有效，如果有效那么直接执行
    //     console.log()

    // }else{
    //     //走网页授权逻辑，更新token信息
    // }
    next();
})  