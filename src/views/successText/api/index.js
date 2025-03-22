import Fetch  from "./../../../serve/https";

export const getWidthDrawDetail=(params)=>{
    return Fetch({
        url:"/api/withdrawalDetail",
        method:"GET",
        params
    })
}