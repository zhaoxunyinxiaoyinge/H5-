import Fetch  from "./../../../serve/https";
export const addAddress=(data)=>{
  return Fetch({
    url:"/api/address",
    method:"post",
    data
})
}

export const getAddress=(params)=>{
  return Fetch({
      url:"/api/address",
      method:'get',
      params
  })
} 

export  const  putAdress=(data)=>{
  return Fetch({
    url:"/api/address",
    method:'get',
    data
  })
}


export  const  delAdress=(id)=>{
  return Fetch({
    url:"/api/address/"+id,
    method:'delete',
  })
}

