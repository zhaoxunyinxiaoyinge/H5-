import Fetch  from "./../../../serve/https";
export const getBabaner=(params)=>{
  return Fetch({
    url:"/api/bananer",
    method:"GET",
    params
})
}


export const getCategory=(params)=>{
  return Fetch({
    url:"/api/category",
    method:"GET",
    params
})
}


export const getGoodsList=(params)=>{
  return Fetch({
    url:"/api/goods",
    method:"GET",
    params
})
}
