import Fetch  from "./../../../serve/https";
export const addOrders=(data)=>{
  return Fetch({
    url:"/api/order",
    method:"POST",
    data
})
}
export const addOrderDetail=(data)=>{
  return Fetch({
    url:"/api/orderDetail",
    method:'POST',
    data
  })
}

export const getOrder=(params)=>{
  return Fetch({
    url:"/api/order",
    method:'GET',
    params
  })
}

export const cancleOrders=(data)=>{
  return Fetch({
      url:"/api/order/:"+data.order_id,
      method:"PUT",
      data
  })
}