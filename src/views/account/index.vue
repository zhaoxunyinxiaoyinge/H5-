<template>
  <div class="accout">
    <div class="account-info">
      <div class="money">可用余额:{{ moneyInfo?.balance_fee }} (元)</div>
      <div class="money-btn">
        <div class="charge" @click="handleJumPto"><van-icon name="gold-coin-o" size="16px"  />充值</div>
        <div class="withdrawal"><van-icon size="16px" name="bill-o" />提现</div>
      </div>
    </div>
    <div class="list">
      <div class="trade">交易明细</div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell center :title="fitlerTtitle(item.action_type)" :value="item.fee + '(元)'"
          :label="filterTime(item.create_time)" :key="item.id" v-for="item in list" />
      </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { NavBar } from "vant"
import { onActivated, ref } from "vue"
import { useRouter } from "vue-router"
import { getBance, getWithdrawalDetail } from "./api/index"
import moment from "moment";

export default {
  name: "account-page",
  components: {
    [NavBar.name]: NavBar
  },
  setup() {
    document.title = '账户详情'
    onActivated(async () => {
      getData();
    })
    const loading = ref(false);
    const finished = ref(false);
    const getLoading=ref(false);
    const list = ref([]);
    const listQuery = ref({ offset: 0, limit: 10 });
    const currpages=ref(0);
    const total = ref(0);
    const moneyInfo = ref({});
    const router = useRouter();
    const refreshing=ref(false);

    const onRefresh=async()=>{
        refreshing.value=true;
        finished.value = false;
        listQuery.value.offset=0;
        currpages.value=0;
        total.value=0
        list.value=[];
        loading.value=false;
        await getWithdrawalDetails({ ...listQuery.value, uuid: 1 });
    }

    const onLoad =async () => {
      console.log("onload")
        listQuery.value.offset=(currpages.value)*10;
        await getWithdrawalDetails({ ...listQuery.value, uuid: 1 });
    }

    const getData = async () => {
      getBance().then(res => {
        if (res.code == 1) {
          moneyInfo.value = res.data[0]
        }
      })
    }

    const getWithdrawalDetails = (params) => {
      if(getLoading.value){return }
         getLoading.value=true;
       getWithdrawalDetail(params).then(res => {
        if(res.code == 1) {
          getLoading.value=false;
          total.value = res.data.total;
          list.value.push(...res.data.rows);
          if (total.value == list.value.length) {
              finished.value = true;
           
          }else{
              currpages.value++;
          }   
          loading.value=false;
          refreshing.value=false;
        }
      })
    }

    const fitlerTtitle = (type) => {
      return type.action_type == 1 ? '提现收入' : type.action_type == 2 ? '充值支付' : '订单支付'
    }

    const filterTime = (time) => {
      return moment(time).format("YYYY-MM-DD h:mm:ss");
    }

    const onClickLeft = () => {
      router.back();
    }

   const handleJumPto=()=>{
      router.push("/charge");
   }  

    return {
      loading,
      finished,
      list,
      onLoad,
      onClickLeft,
      moneyInfo,
      listQuery,
      total,
      fitlerTtitle,
      filterTime,
      handleJumPto,
      onRefresh,
      refreshing,
      getLoading
    }
  }

}
</script>

<style lang="css" scoped>
.account {
  background-color: #e0dede;
}

.account-info {
  margin: 10px;
}

.money {
  width: 100%;
  background-color: #07c610;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 100px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.money-btn {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-around;
}

.charge,
.withdrawal {
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  padding: 0 10px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.charge {
  background-color: red;
}

.withdrawal {
  background-color: #07c610;
}

.trade {
  margin: 0 20px;
  margin-top: 50px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  color: #333;
  padding: 5px 0;
}
</style>

<style>
:root:root {
  --van-list-text-font-size: 12px;
  --van-cell-font-size: 12px;
}
</style>