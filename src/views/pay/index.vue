<template>
  <div class="pay">
    <div class="order-money"><span class="desc">支付金额:￥</span>{{ order&&order.amount }}</div>
    <div class="order-number">商品订单编号:{{ order&&order.number }}</div>
    <div class="pay-time">订单剩余支付时间:{{ time }}</div>
    <div class="pay-method">
      <van-button type="success" size="small" icon="chat-o">微信支付</van-button>
      <van-button type="success" size="small" icon="paid" @click="handlePay">余额支付</van-button>
    </div>
  </div>
</template>
<script setup>
import { onActivated, onDeactivated } from "vue";
import { onMounted, ref } from "vue";
import { defineOptions } from "vue";
import {cancleOrders,getOrder} from "./../settlement/api/index";
import {useRoute,useRouter} from "vue-router"
import {paywidrawr} from "./api/index";
import {Toast } from "vant"
import cookies from "js-cookies";

defineOptions({
  name: "pay_page"
})

onMounted(async() => {
 document.title='支付'
 orderId.value= route.query.order_id;
 getOrders({order_id:orderId.value});
})

const getOrders =async(params)=>{
  let res=await getOrder(params);
  order.value=res.data;
}

onActivated(()=>{
  let validTime=cookies.getItem("endTime");
  if(validTime){
      endTime.value=parseInt(validTime);
  }
  orderId.value= route.query.order_id;
  getOrders({order_id:orderId.value});
    beginComputedTime()()
})

onDeactivated(()=>{
  if(timer){
    clearInterval(timer);
    cookies.setItem("endTime",endTime.value);
  }
})
let time = ref();
let orderId=ref();
let timer=null;
let route=useRoute();
let router=useRouter();
let order=ref();
let endTime=ref(0);

const getCurrentOrderPayTime = (endTime) => {
  let minutes = parseInt(endTime/60);
  let seconds = endTime%60; 
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return minutes + ":" + seconds;
}

const beginComputedTime = () => {
  let firstTime = 5*60;
  return () => {
    if(endTime.value>0){
      time.value = getCurrentOrderPayTime(endTime.value); 
    }else{
      time.value = getCurrentOrderPayTime(firstTime);
    }
     timer = setInterval(() => {
      // 在本页面订单等待时间超过支付时间，自动取消订单
      if (endTime.value - firstTime >0) {
        clearInterval(timer);
        setCancleOrder();
      }else{
        endTime.value++;
        time.value = getCurrentOrderPayTime(firstTime-endTime.value); 
      }
    }, 1000)
  }
}

//取消订单
const setCancleOrder=async()=>{
  await cancleOrders({cancle:true,order_id:orderId});
  router.push({path:"/persion"});
}

//调用支付接口
const handlePay=async()=>{
    clearInterval(timer);
   let res= await paywidrawr({action_type:3,user_id:1,fee:order.value.amount,pay_method:3});
   if(res.code==1){
    Toast.success('成功支付');
      router.push({
        path:"/pay_success",
        query:{
          id:res.data.id
        }
      })
   }
}

</script>

<style lang="css" scoped>
.pay {
  font-size: 14px;
  min-height: 100vh;
}

.order-money {
  text-align: center;
  line-height: 40px;
  font-size: 30px;
  font-weight: bold;
  margin-top: 50px;

}
.desc {
  font-size: 14px;
   vertical-align: middle;
}

.order-number {
  line-height: 30px;
  margin: 20px  0px 0px;
  text-align: center;
}

.pay-time {
  text-align: center;
}

.pay-method {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
}
</style>