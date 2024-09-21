<template>
  <div class="accout">
    <div class="account-info">
      <div class="money">可用余额:{{ moneyInfo?.balance_fee }} (元)</div>
      <div class="money-btn">
        <div class="charge"><van-icon name="gold-coin-o" size="16px" />充值</div>
        <div class="withdrawal"><van-icon size="16px" name="bill-o" />提现</div>
      </div>
    </div>
    <div class="list">
      <div class="trade">交易明细</div>
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell center :title="fitlerTtitle(item.action_type)" :value="item.fee+'(元)'" :label="filterTime(item.create_time)" :key="item.id" v-for="item in list" />
      </van-list>
    </div>
  </div>
</template>
<script>
import { NavBar } from "vant"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { getBance, getWithdrawalDetail } from "./api/index"
import { onMounted } from "vue";
import moment from "moment";

export default {
  name: "account-page",
  components: {
    [NavBar.name]: NavBar
  },
  setup() {

    onMounted(async() => {
      getData();
      loading.value=true;
     await getWithdrawalDetails({...listQuery.value,uuid:1});
    })

    const loading = ref(false);
    const finished = ref(false);
    const list = ref([]);
    const listQuery = ref({ offset: 0, limit: 10 });
    const total = ref(0);
    const moneyInfo = ref({});
    const router = useRouter();



    const onLoad = () => {

    }

    const getData = async () => {
      getBance().then(res => {
        if (res.code == 1) {
          moneyInfo.value = res.data[0]
        }
      })
    }

    const getWithdrawalDetails = (params) => {
      getWithdrawalDetail(params).then(res => {
        if (res.code == 1) {
          if(res.data.total==res.data.count){
            finished.value=true;
          }
          total.value=res.data.total;
          listQuery.value.offset=res.data.offset;
          listQuery.value.limit=res.data.limit;
          list.value=res.data.rows;
        }
        loading.value=false;
      })
    }

    const fitlerTtitle=(type)=>{
        return type.action_type==1?'提现收入':type.action_type==2?'充值支付':'订单支付'
    }

    const filterTime=(time)=>{
       return moment(time).format("YYYY-MM-DD h:mm:ss");
    }

    const onClickLeft = () => {
      router.back();
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
      filterTime
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
  background-color: orange;
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
  width: 80px;
  height: 40px;
  border-radius: 10px;
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
  background-color: rgb(193, 10, 10)
}

.withdrawal {
  background-color: rgb(15, 15, 66);
}

.trade {
  margin: 0 20px;
  font-size: 12px;
  border-bottom: 1px solid #efefef;
  color: rgb(157, 244, 157)
}

</style>

<style>
:root:root  {
  --van-list-text-font-size:12px;
  --van-cell-font-size:12px;
}
</style>