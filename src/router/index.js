
import {getUserInfo,getAccessToken} from "./../serve/api";
import  cookies from "js-cookies";
import { createWebHistory, createRouter } from "vue-router";


let router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: "danbans",
            component: () => import('@/components/layout/index.vue'),
            redirect: "/persion",
            children: [
                {
                    name: 'userCenter',
                    path: '/persion',
                    meta: {
                        title: '我的',
                    },
                    component: () => import('@/views/userCenter/index.vue')
                },
                {
                    name: "ArtIcle",
                    path: "/cart",
                    meta: {
                        title: "购物车",
                    },
                    component: () => import('@/views/cart/index.vue')
                }, {
                    name: "CartGory",
                    path: "/cartgory",
                    meta: {
                        title: "分类"
                    },
                    component: () => import("@/views/cartgory/index.vue")
                },
                {
                    name: "JianLi",
                    path: "/index",
                    meta: {
                        title: "首页"
                    },
                    component: () => import("@/views/index/index.vue")
                }
            ],

        },
        {
            path: "/myorder",
            name: "MyOder",
            meta: {
                title: "我的订单"
            },
            component: () => import("@/views/myorder/index.vue")
        },

        {
            path: "/address",
            name: 'Address',
            meta: {
                title: "用户地址"
            },
            component: () => import("@/views/userCenter/address.vue")
        },
        {
            path:"/search",
            meta:{
                title:"搜索"
            },
            component:()=>import("@/views/search/index.vue")
        },
        {
            path:"/goods/detial",
            meta:{
                title:"商品详情页"
            },
            component:()=>import("@/views/goodDetail/index.vue")
        },
        {
                path:"/settlement",
                meta:{
                    title:"去结算"
                },
            component:()=>import("@/views/settlement/index.vue")
        },
        {
            path:"/comment",
            meta:{
                title:"comment"
            }
            ,
            component:()=>import("@/views/comment/index.vue")

        },
        {
            path:"/account",
            meta:{
                title:"账户余额"
            }
            ,
            component:()=>import("@/views/account/index.vue")

        },
        {
            path:"/reply",
            meta:{
                title:"商品评论"
            },
            component:()=>import("@/views/replys/index.vue")
        },
        {
            path:"/pay",
            meta:{
                title:"支付"
            },
            component:()=>import("@/views/pay/index.vue")
        },
        {
            path:"/pay_success",
            meta:{
                title:"支付"
            },
            component:()=>import("@/views/successText/index.vue")
        },

        {
            path:"/charge",
            meta:{
                title:"充值"
            },
            component:()=>import("@/views/charge/index.vue")
        },
    
    ]
})

router.beforeEach(async(to,from,next)=>{
        if(!cookies.getItem("token")){
          await getAutoreize(to);
           next()
        }else{
        next();
    }
})


const getAutoreize= async(to)=>{
    let code = "";
    if (!cookies.getItem('token') && !to.query.code) {
        let path = window.location.href;
        let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxacd36442f62ad2b9"+"&redirect_uri="+path+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        window.location.replace(url);
    } else if (!cookies.getItem("token") && to.query.code) {
        code = to.query.code;
        let data = await getAccessToken({ code, webToken: true });
        cookies.setItem('token', data.token);
        cookies.setItem('code', code);
        cookies.setItem("openid",data.openid)
        getUserInfos(data.openid)
    } 
}

const getUserInfos=async(openid)=>{
    try {
        let res = await getUserInfo({ userInfo: true, openid: openid, lang: "zh-CN" });
        console.log(res.data,"res");
        cookies.setItem("userinfo", JSON.stringify(res.data));
    } catch (e) {
        console.log(e)
    }
}


export {
    router
}