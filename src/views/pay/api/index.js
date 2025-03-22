import Fetch from "./../../../serve/https";

export const paywidrawr=(data)=>{
  return Fetch({
    url:"/api/withdrawal",
    method:"post",
    data
  })
}