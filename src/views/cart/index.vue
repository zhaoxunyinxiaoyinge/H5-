<template>
    <div class="cart">
        <div  class="content" v-if="cartList.length>0" >
            <div v-for="(item) in cartList" :key="item.id" class="cart-list">
            <van-checkbox :bind-group="false" v-model="item.checked" :name="item.id" :key="item.id" checked-color="#ee0a24" size="19" style="margin-right:16px"  @click="handleItemChecked"> </van-checkbox>
            <van-image width='123'  :src="item.img_url" height="82" ></van-image>
            <div class="goods-sub-title" @click="handleJumpToDetail(item.id)">
                <p class="goods-text">{{ item.name }}</p>
                <span class="goods-mount"> 已售{{ item.mount }}</span>
                <div class="goods-price"><span>￥{{ item.price }}</span>
                    <van-stepper  v-model="item.num" theme="round" button-size="22" :disable-input="item.num==1"   />
                </div>
            </div>
            </div>
        </div>
        <div class="empty-shop" v-else>
            <van-image fit="cover" width="136" height="104" :src="img"></van-image>
            <span class="empty-txt">购物车是空的</span>
            <van-button class="empty-btn"  @click="handleLook">去逛逛</van-button>
        </div>
        <div class="tuijian">
            <span>为您推荐</span>
        </div>
        <div class="tuijian-list">
            <div class="goods-list">
                <van-image width='172' height="104"></van-image>
                <div class="goods-sub-title">
                    <p class="goods-text">猪肉排骨肋骨</p>
                    <span class="goods-mount"> 已售100</span>
                    <div class="goods-price"><span>￥0.00</span>
                        <div class="goods-cart-icon">
                            <van-icon color="#fff" name="cart-o" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="goods-list">
                <van-image width='172' height="104"></van-image>
                <div class="goods-sub-title">
                    <p class="goods-text">猪肉排骨肋骨</p>
                    <span class="goods-mount"> 已售100</span>
                    <div class="goods-price"><span>￥30.00</span>
                        <div class="goods-cart-icon">
                            <van-icon color="#fff" name="cart-o" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <van-submit-bar class="bottom-height" tip="请填写正确的收货地址" :price="total*100" button-text="去结算" :disabled="!hasSubmit" @submit="onSubmit">
            <van-checkbox v-model="checkedAll"  @click="handleChecked(checkedAll)">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>
<script>
import { Image, Stepper, Checkbox, SubmitBar } from 'vant';
import { onMounted } from "vue";
import emptyImg from "@/assets/empty-cart.png"
import {useStore} from "vuex"
import { computed } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'ArtIcle',
    components: {
        [Image.name]: Image,
        [Stepper.name]: Stepper,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar
    },
    setup() {
        onMounted(() => {
            document.title = "购物车";
            let flag=store.getters.getCheckedStatus;
            checkedAll.value=flag;
        })
       const store= useStore();
       const checkedAll=ref(false);
       const router=useRouter();


       const handleChecked=(checked)=>{
        store.commit("handleChecked",checked)
       }

       const handleItemChecked=()=>{
        let flag=store.getters.getCheckedStatus;
        checkedAll.value=flag;
       }

       const onSubmit=()=>{
        router.push({path:"/settlement"})
       }

       const handleLook=()=>{
            router.push("/index")
       }

       const handleJumpToDetail=(id)=>{
            router.push({path:"/goods/detial",query:{id}})
       }

        return {
            img:emptyImg,
            cartList:computed(()=>store.state.cartGoods),
            total:computed(()=>store.getters.getTotalPrice),
            hasSubmit:computed(()=>store.state.cartGoods.some(item=>item.checked==true)),
            checkedAll,
            handleChecked,
            handleItemChecked,
            onSubmit,
            handleLook,
            handleJumpToDetail
        }
    }
}
</script>
<style scoped>
.cart {
    padding: 14px 12px;
    padding-bottom: 80px;
}

.content {
    min-height:40vh;
}

.cart-list {
    width: 351px;
    height: 101px;
    background-color: #f7f8fa;
    margin: 0 auto 7px;
    border-radius: 11px;
    display: flex;
    box-sizing: border-box;
    padding: 8px 18px 11px 18px;
}


.goods-list {
    border-radius: 11px;
    background-color: #fff;
    width: 172px;
    height: 182px;
    box-sizing: border-box;
    margin-bottom: 7px;
}

.goods-sub-title {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 12px;
    color: rgb(50, 51, 52, 1);
    padding: 10px 0 0 10px;
}

.goods-mount {
    font-size: 10px;
    color: rgba(167, 165, 165, 1);
    margin-bottom: 10px;
}

.goods-price {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: flex-end;
    color: rgba(249, 108, 47, 1);
    font-size: 13px;
    width: 100%;
}

.goods-cart-icon {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgba(249, 108, 47, 1);
    margin-right: 10px;
}

.tuijian {
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    line-height: 18px;
    margin: 8px 0;
}

.tuijian-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.empty-shop {
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* padding-top: 34px; */
    height:50vh;
    align-items: center;
}

.empty-txt {
    color:rgba(167, 165, 165, 1);
    font-size: 12px;
    margin-top: 14px;
    margin-bottom: 12px;
}

.empty-btn {
    width: 88px;
    height: 34px;
    background: linear-gradient(180deg,rgba(253, 165, 92, 1) 0%,rgba(249, 108, 47, 1) 100%);
    border-radius: 16px;
    color:#fff;
    font-size: 12px;
    margin-bottom: 28px;
}


</style>

<style>
.bottom-height.van-submit-bar {
    bottom: 80px
}

.van-submit-bar__tip {
    text-align: left;
}
</style>