import Fetch  from "./https";
/**
 * 获取基础access_token
 */

export function getBaiseAccessToken(){
    return Fetch({
        url:"/api/accktoken",
        method:"get",
    })
}


/**
 * 获取基础的执行jsapi_stick的获取
 */

export function getJsapiSticket(params){
    return Fetch({
        url:"/api/sticket",
        method:"get",
        params
    })
}

/**
 * 获取当前的签名
 */
export function getSignStr(data){
    return Fetch({
        url:"/api/sticket",
        data:data,
        method:'post'
    })
}

/**
 * 获取access_token(网页基础acctoken,非用户当前页面信息token);
 */

export const getAccessToken=function(params){
    return Fetch({
        url:"/api/accktoken",
        method:"get",
        params
    })
}

/**
 * 获取当前用户的信息
 *
 */

export function getUserInfo(params){
    return Fetch({
        url:"/api/sticket",
        method:"get",
        params
    })
}

export const uploadFiles=(data)=>{
    return Fetch({
        url:"/api/uploadImage",
        method:'POST',
        data,
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
}