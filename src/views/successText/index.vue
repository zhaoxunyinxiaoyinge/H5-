<template>
  <div class="sucess">
    <div class="title">
      <van-icon name="success" size="36" color="green" />
      <span>支付成功</span>
    </div>
    <div class="pay-money">
      ￥{{ payInfo.fee }}
    </div>
    <div class="pay_info">
      <div class="time"><span>交易时间:</span><span>{{ getFormatTime(payInfo.create_time) }}</span></div>
      <div class="money"><span>交易金额:</span><span>￥{{ payInfo.fee }}</span></div>
      <div class="methods"><span>交易方式:</span><span>{{
        payInfo.pay_method == 3 ? "钱包支付" : payInfo.pay_method == 2 ? "支付宝" : '微信'}}</span></div>
    </div>
    <div class="tip"><van-button block type="success">知道了</van-button></div>
    <div class="content"><van-button @click="handleJumto">点击返回首页</van-button></div>

  </div>
</template>
<script setup>
import { defineOptions, onActivated, onDeactivated, ref } from "vue";
import { useRouter, useRoute } from "vue-router"
import { getWidthDrawDetail } from "./api/index";
import {useUtils} from "./../../utils/useUtils";


defineOptions({
  name: "success-page"
})

onActivated(() => {
  if(route.query.id) {
    let id = route.query.id;
    getWidhDraw({ id })
  }
})

onDeactivated(() => {
  payInfo.value = {};
})

document.title = '支付成功'
const router = useRouter();
const route = useRoute();
const payInfo = ref({});
const {getFormatTime}=useUtils();


const getWidhDraw = async (params) => {
  let res = await getWidthDrawDetail(params);
  if(res.code==1){
    payInfo.value=res.data.rows[0];
  }
}

const handleJumto = () => {
  router.push("/index");
}

</script>

<style scoped lang="scss">
.title {
  margin-top: 50px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  line-height: 60px;
}

.tip {
  width: 50%;
  margin: 30px auto;
}

.content {
  display: flex;
  justify-content: center;
}

.pay_info {
  width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.time,
.money,
.methods {
  line-height: 40px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}

.pay-money {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
</style>
