<template>
    <div>
        <div>
            <router-view></router-view>
        </div>
        <div>
            <van-tabbar :route="true" :placeholder="true" v-model="active" active-color="#ee0a24" inactive-color="#000">
                <van-tabbar-item icon="home-o" replace to="/index">首页</van-tabbar-item>
                <van-tabbar-item icon="apps-o" replace to="/cartgory">分类</van-tabbar-item>
                <van-tabbar-item icon="cart-o" replace to="/cart" :badge="num">购物</van-tabbar-item>
                <van-tabbar-item icon="user-o" replace to="/persion">我的</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
import { computed } from "vue";
import {useStore} from "vuex"
export default {
    name: 'DanBar',
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    setup() {
      let store=useStore();

        return {
            num:computed(()=>store.getters.cartGoodsNum)
        }
    }
}

</script>