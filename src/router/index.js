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
                title:""
            },
            component:()=>import("@/views/pay/index.vue")
        }
    
    ]
})

export {
    router
}