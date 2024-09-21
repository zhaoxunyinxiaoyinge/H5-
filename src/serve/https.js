import axios from "axios";
let url = process.env.VUE_APP_BASE_API;

let httpRequest = axios.create({
    baseURL: url,
    timeout: 50000
})

httpRequest.interceptors.request.use((req) => {
    req.headers.Authorization ="eyJ0eXAiOiJKV1QiLCJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJhdWQiOiJBUFAiLCJ1c2VyX2lkIjoiMSIsImlzcyI6IlNlcnZpY2UiLCJleHAiOjE3MjY1ODYzODgsImlhdCI6MTcyNDk0NDc4OH0.9rfUf8K-ftbOA1uE82pXa5qmn4XFiEqPVXj7K9Qaxk8";
    return req
}, (err) => {
    return Promise.reject(err);
})


httpRequest.interceptors.response.use((res) => {
    if (res.status == 200) {
        return Promise.resolve(res.data);
    }
    if (res.status == 500) {
        return Promise.reject(res.data);
    }

    if (res.status != 200 && res.status != 500) {
        return Promise.reject("服务请求错误")
    }
    return res.data
}, (err) => {
    return Promise.reject(err);
})


export default httpRequest