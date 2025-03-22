<template>
  <div class="charge">
    <div class="content">
       <div class="title">充值金额</div>
       <div class="btn">
            <div class="btn-money active">充值1000</div>
            <div class="btn-money">充值500</div>
            <div class="btn-money">充值100</div>
            <div class="btn-money">充值50</div>
       </div>
    </div>
    <div class="pay-method">
      <div class="title">选择支付方式</div>
      <div class="zhifubao">
        <div class="name">
          <van-icon name="alipay" />
          <span>支付宝</span>
        </div>
        <van-checkbox></van-checkbox>
      </div>
      <div class="weixin">
        <div class="name">
          <van-icon name="chat" />
          <span>微信</span>
        </div>
        <van-checkbox></van-checkbox>
      </div>
    </div>
     <div class="commit">立即充值</div> 
  </div>
</template>
<script setup>
  import {defineOptions,onActivated} from "vue";
  defineOptions({
    name:"charge-page"
  })

  onActivated(()=>{
    document.title='充值页面'
  })
   
</script>

<style lang="scss" scoped>
.charge {
  padding: 20px;
}
.title {
  font-size: 14px;
  line-height: 30px;
}

.btn {
  display: flex;
  justify-content: space-between;
  margin:20px 0;
  flex-wrap: wrap;
}
.btn-money {
  width: 45%;
  border-radius: 5px;
  line-height: 50px;
  font-size: 14px;
  border:1px solid #efefef;
  text-align: center;
  margin: 5px 0;
  &.active {
      background-color: #07c610;
      color: #fff;
  }
}

.pay-method {
  display: flex;
  flex-direction: column;
}

.weixin,.zhifubao{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin:10px 0;
}

.commit {
  width:80%;
  border-radius: 20px;
  height: 40px;
  line-height: 40px;
  background-color: #07c610;
  color:#fff;
  text-align: center;
  font-size: 12px;
  position: fixed;
  bottom: 100px;
  left:50%;
  transform: translateX(-50%);
  font-weight: bold;
}

</style>