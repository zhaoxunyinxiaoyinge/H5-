import Fetch  from "./../../../serve/https";

export const getSearchGoods=(params)=>{
  return Fetch({
    url:"/api/goods",
    method:"GET",
    params
  })
}