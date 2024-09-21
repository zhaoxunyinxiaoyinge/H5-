<template>
  <div class="settlement">
    <div class="adress" v-if="orderInfo">
      <van-cell title="收货地址" is-link arrow-direction="right" size="12px" :value="orderInfo.address"
        @click="jumpToAddress" />
      <van-action-sheet v-model:show="show" @select="onSelect" title="选择收货地址">
        <div class="address">
          <van-address-list v-model="chosenAddressId" :list="list" :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围" default-tag-text="默认" @add="onAdd" />
        </div>
      </van-action-sheet>
    </div>

    <div class="order-goods">
      <div class="订单商品信息"></div>
      <van-card :num="item.num" tag="标签" :price="item.price" desc="描述信息" :title="item.name" :thumb="item.img_url"
        :key="item.id" origin-price="10.00" v-for="item in goods" />
    </div>
    <div class="order-desc" v-if="orderInfo">
      <van-cell-group>
        <van-cell title="支付金额" :value="orderInfo.amount" />
        <van-cell title="支付状态" :value="orderInfo.status == 1 ? '待支付' : '已支付'" />
        <van-cell title="送达状态" :value="orderInfo.delivery_status == 1 ? '立即配送' : '稍后配送'" />
      </van-cell-group>
    </div>

    <div class="order-user" v-if="orderInfo">
      <van-cell-group>
        <van-field v-model="orderInfo.remark" label="备注" placeholder="请输入备注信息" />
        <van-field v-model="orderInfo.consignee" label="收货人" placeholder="请输入收货人" />
        <van-field v-model="orderInfo.phone" label="手机号码" placeholder="请输入手机号码" />
      </van-cell-group>
    </div>
    <van-submit-bar :price="orderInfo.amount" button-text="去支付" @submit="onSubmit" />
  </div>

</template>
<script>
import { Cell, ActionBar, ActionBarIcon, ActionBarButton, Card, CellGroup, Field, SubmitBar, ActionSheet } from "vant"
import { useRouter } from "vue-router"
import { ref } from "vue";
import { useStore } from "vuex"
import { onActivated } from "vue";
import { getAddress } from "./../userCenter/api/index";
import { addOrders, addOrderDetail } from "./api/index";

export default {
  name: 'settle-ment',
  components: {
    [Cell.name]: Cell,
    [ActionBar.name]: ActionBar,
    [ActionBarButton.name]: ActionBarButton,
    [ActionBarButton.name]: ActionBarIcon,
    [Card.name]: Card,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [SubmitBar.name]: SubmitBar,
    [ActionSheet.name]: ActionSheet,

  },
  setup() {
    onActivated(() => {
      document.title='商品结算'
      orderInfo.value.amount = store.getters.getTotalPrice+orderInfo.value.pack_amount;
      getDefaultAddress({ isDefault: 1 });
    })
    const router = useRouter();
    const show = ref(false);
    // 初始化模板数据
    const templateData={
      remark: "",
      phone: '',
      address: '',
      user_name: '',
      consignee: "",
      cancel_reason: '',
      rejection_reason: "",
      cancel_time: null,
      pack_amount: 4,
      status: 1,
      address_book_id: "",
      user_id: null,
      amount: '',
      pay_status: 1

    }
    const orderInfo = ref(templateData);//订单消息
    const store = useStore();

    const goods = ref(store.state.cartGoods);

    const actions = ref([
      { name: '选项一' },
      { name: '选项二' },
      { name: '选项三' },
    ]);

    const getDefaultAddress = async () => {
      let res = await getAddress({ isDefault: 1 });
      orderInfo.value.address = res.data[0].province_name + '/' + res.data[0].city_name + '/' + res.data[0].district_name + '/' + res.data[0].detail;
      orderInfo.value.address_book_id = res.data[0].id;
    }

    const onClickLeft = () => {
      router.back();
    }

    const jumpToAddress = () => {
      show.value = true;
    }

    const onAdd = () => {
      router.push("/address");
    }

    const onSubmit = async () => {
      let res = await addOrders(orderInfo.value);
      if (res.code == 1) {
        let good = goods.value.map(item => { return { id: item.id, num: item.num } });
        await addOrderDetail({ orderId: res.data.id, good });
        // 对购物车进行清空处理，同时对当前页面的数据也要清空
        store.commit("clearCartGoods");
        orderInfo.value=templateData;
        router.push({path:"/pay",query:{order_id:res.data.id}});

      }
    }

    return {
      show,
      actions,
      onClickLeft,
      jumpToAddress,
      onAdd,
      goods,
      orderInfo,
      onSubmit

    }
  }
}
</script>
<style scoped lang="scss">
.settlement {
  // min-height: 100vh;
  background-color: #dfe3df20;
}

.order-goods,
.order-user,
.order-desc,
.adress {
  background-color: #fff;
  margin: 10px;
}

.address {
  min-height: 200px;
}
</style>

<style lang="css">
:root .settlement .van-cell__title,
.van-cell__value {
  display: flex;
  justify-content: flex-start;
}
</style>