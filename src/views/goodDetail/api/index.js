import Fetch  from "./../../../serve/https";
export const getGoodsDetail=(params)=>{
  return Fetch({
    url:"/api/goods",
    method:"GET",
    params
})
}

export const getCommentByGoodsId=(params)=>{
  return Fetch({
    url:"/api/comment",
    method:"GET",
    params
  })
}
