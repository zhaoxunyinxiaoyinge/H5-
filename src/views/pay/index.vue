<template>
  <div class="pay">
    <van-nav-bar title="商品支付" />
    <div class="order-number">商品订单编号:{{ order&&order.number }}</div>
    <div class="pay-time">订单剩余支付时间:{{ time }}</div>
    <div class="pay-method">
      <van-button type="success" size="small" icon="chat-o">微信支付</van-button>
      <van-button type="success" size="small" icon="paid">余额支付</van-button>
    </div>
  </div>
</template>
<script setup>
import { onDeactivated } from "vue";
import { onMounted, ref } from "vue";
import { defineOptions } from "vue";
import {cancleOrders,getOrder} from "./../settlement/api/index";
import {useRoute,useRouter} from "vue-router"

defineOptions({
  name: "pay_page"
})

onMounted(() => {
  document.title='支付'
 orderId.value= route.query.order_id;
 getOrders({order_id:orderId.value});
  beginComputedTime()()
})

const getOrders =async(params)=>{
  let res=await getOrder(params);
  order.value=res.data;
}

onDeactivated(()=>{
  if(timer){
    clearInterval(timer);
  }
})
let time = ref();
let orderId=ref();
let timer=null;
let route=useRoute();
let router=useRouter();
let order=ref();


const getCurrentOrderPayTime = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  let day = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
  let hours = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours();
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return year + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;
}

const beginComputedTime = () => {
  let firstTime = Date.now();
  let endTime = null;
  return () => {
    time.value = getCurrentOrderPayTime();
     timer = setInterval(() => {
      endTime = Date.now();
      if (endTime - firstTime > 1 * 60 * 1000) {
        clearInterval(timer);
        setCancleOrder();
      }
      time.value = getCurrentOrderPayTime();
    }, 1000)
  }
}

//取消订单
const setCancleOrder=async()=>{
  await cancleOrders({cancle:true,order_id:orderId});
  router.push({path:"/persion"});
}

</script>

<style lang="css" scoped>
.pay {
  font-size: 14px;
}

.order-number {
  line-height: 30px;
  margin: 60px 0 0px;
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