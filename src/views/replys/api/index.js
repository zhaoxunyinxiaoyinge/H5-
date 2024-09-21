import Fetch from "./../../../serve/https"
export const getDetialByOrderId=(params)=>{
    return Fetch({
      url:"/api/orderDetail",
      params,
      method:"GET"
    })
}

export const getMarkByScore=(params)=>{
    return Fetch({
      url:"/api/mark",
      params,
      method:"GET"
    })
} 

export const commitComment=(data)=>{
  return Fetch({
    url:"/api/comment",
    data,
    method:"POST"
  })
}

export const createMarkAndComment=(data)=>{
  return Fetch({
    url:"/api/commentMark",
    method:'POST',
    data
  })
}