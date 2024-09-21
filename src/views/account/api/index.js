import Fetch  from "./../../../serve/https";

export const getBance=(params)=>{
    return Fetch({
        url:"/api/withdrawal",
        method:"get",
        params
    })
}

export const getWithdrawalDetail=(params)=>{
    return Fetch({
        url:"/api/withdrawalDetail",
        method:"get",
        params
    })
}