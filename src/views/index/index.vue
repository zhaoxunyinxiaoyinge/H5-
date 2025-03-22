<script>
import { Field, Image, Icon, Sticky, Swipe, SwipeItem,NoticeBar } from "vant";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { getBabaner, getCategory, getGoodsList } from "./api/index.js"
import { reactive } from "vue";
import { useStore } from "vuex"

export default {
    name: 'WeclomeIndex',
    components: {
        [Field.name]: Field,
        [Image.name]: Image,
        [Icon.name]: Icon,
        [Sticky.name]: Sticky,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [NoticeBar.name]:NoticeBar

    },
    setup() {

        const router = useRouter();
        const list = reactive([]);
        const categoryList = reactive([{ name: "全部" }]);
        const goodsList = reactive([]);
        const store = useStore();

        onMounted(() => {
            document.title = "首页";
            getData();
            getCategoryData();
            getGoodsData();
        })

        const jumpToSearch = () => {
            router.push("/search");
        }

        const getData = async () => {
            let res = await getBabaner({status:1});
            if (res.code == 1) {
                list.push(...res.data);
            }
        }

        const getCategoryData = async () => {
            let res = await getCategory({ page: 1, pageSize: 10, status: 1 });
            if (res.code == 1) {
                categoryList.push(...res.data);
            }
        }

        const getGoodsData = async () => {
            let res = await getGoodsList({ page: 1, pageSize: 10, status: 1 });
            if (res.code == 1) {
                goodsList.push(...res.data);
            }
        }

        const handleIndex = async (categoryId) => {
            let res = await getGoodsList({ page: 1, pageSize: 10, status: 1, categoryId: categoryId === 0 ? null : categoryId });
            if (res.code == 1) {
                goodsList.length = 0;
                goodsList.push(...res.data);
            }
        }

        const handleJumptoCategory = (categoryId) => {
            router.push({ path: "/cartgory", query: { categoryId } });
        }

        const handleJumptoDetail = (query) => {
            router.push({ path: "/goods/detial", query })
        }

        return {
            jumpToSearch,
            list,
            categoryList,
            goodsList,
            handleIndex,
            handleJumptoCategory,
            handleAddCarts: (goods) => store.commit("addCartGoods", goods),
            handleJumptoDetail
        }
    }
}
</script>

<template>
    <div class="weclome">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in list" :key="index">
                <div class="banbaner" :style="{ background: `url(${item.img_url}) no-repeat` }">
                    <div class="banbaner-title">
                        <span>新</span> |
                        <span>鲜</span> |
                        <span>蔬</span> |
                        <span>菜</span> |
                        <span>上</span> |
                        <span>市</span>
                    </div>
                    <div class="big-title">
                        精选果蔬,美味自然
                    </div>

                    <div class="input-title">
                        新客优惠半价
                    </div>
                </div>
            </van-swipe-item>

        </van-swipe>

        <van-sticky :offset-top="20">
            <div class="search">
                <van-field @focus="jumpToSearch" left-icon="search" placeholder="搜索商品" />
            </div>
        </van-sticky>
        <div class="sub-title">
            <span>公告</span>
            <span>购物平台正式上线</span>
        </div>
        <van-notice-bar left-icon="volume-o" text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。" />
        <div class="icon-center">
            <div class="icon-list" :key="index" v-for="(item, index) in categoryList"
                @click="handleJumptoCategory(item.id)">
                <van-image width="47" height="43" :src="item.icon"> </van-image>
                <span>{{ item.name }}</span>
            </div>
        </div>

        <div class="sub-title hot">
            <span>热销推荐</span>
        </div>
        <div class="hot-list">
            <div class="hot-list-item" :key="index" v-for="(item, index) in goodsList.slice(0, 4)">
                <div class="hot-list-ite-text">
                    <span class="hot-title">{{ item.name }}</span>
                    <span class="hot-mount">已售{{ item.mount }}</span>
                    <span class="hot-money">￥{{ item.price }}</span>
                </div>
                <div class="hot-imgage">
                    <van-image :src="item.img_url" height="52px" width="81px"></van-image>
                </div>
            </div>
        </div>

        <div class="sub-title">
            <div class="sub-title-list">
                <van-tabs v-model:active="active" @change="handleIndex">
                    <van-tab :key="index" v-for="(item, index) in categoryList" :title="item.name"></van-tab>
                </van-tabs>
            </div>
        </div>


        <div class="all">
            <div class="goods-list" :key="index" v-for="(item, index) in goodsList"
                @click="handleJumptoDetail({ id: item.id })">
                <div class="thubm-img">
                    <van-image class="img" :src="item.img_url"></van-image>
                </div>

                <div class="goods-sub-title">
                    <p class="goods-text">{{ item.name }}</p>
                    <span class="goods-mount">已售{{ item.mount }}</span>
                    <div class="goods-price"><span>￥{{ item.price }}</span>
                        <div class="goods-cart-icon" @click.stop.prevent="handleAddCarts(item)">
                            <van-icon name="plus" color="#fff" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.weclome {
    background-color: rgba(245, 249, 250, 1);
    /* padding:  0 12px; */
}

.banbaner {
    background-size: cover;
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
}

.banbaner-title {
    color: rgba(131, 131, 131, 1);
    font-size: 8px;
    font-weight: 400;
    margin-top: 40px;
    margin-left: 21px;
    display: inline-block;
}

.big-title {
    font-size: 20px;
    font-weight: 700a;
    color: rgba(83, 200, 20, 1);
    margin-top: 10px;
    margin-left: 21px;
}

.input-title {
    width: 116px;
    height: 15px;
    text-align: center;
    line-height: 15px;
    font-size: 9px;
    border-radius: 7px;
    background-color: #fff;
    margin-top: 11px;
    margin-left: 21px;
}

.search {
    width: 351px;
    margin: -19px auto 0;
    height: 38px;
    border-radius: 19px;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid #eee
}

.sub-title {
    /* margin-left: 11px; */
    margin-top: 13px;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 0 10px;
}

.sub-title>span:first-child {
    color: rgba(249, 108, 47, 1);
    font-size: 13px;
    font-weight: 700;
    margin-right: 8px;
}

.sub-title:last-child {
    font-size: 11px;
    color: rgb(50, 51, 52);
}

.icon-center {
    width: 351px;
    margin: 11px auto 0;
    background-color: #fff;
    border-radius: 11px;
    height: 188px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    box-sizing: border-box;
}

.icon-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 9px;
}

.icon-list span {
    font-size: 11px;
    color: rgb(50, 51, 52, 1);
    margin-top: 11px;
}

.sub-title.hot span {
    color: rgb(50, 51, 52, 1);
    font-size: 14px;
}

.hot-list {
    margin: 14px auto;
    width: 351px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.hot-list-item {
    display: flex;
    width: 172px;
    height: 72px;
    border-radius: 11px;
    background-color: #fff;
    margin-bottom: 6px;
    display: flex;
    box-sizing: border-box;
    padding: 13px 0 0 10px;
    align-items: flex-start;
}

.hot-list-ite-text {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: flex-start;
    justify-content: space-evenly;

}

.hot-title {
    font-size: 12px;
    color: rgb(50, 51, 52, 1);
    font-weight: bold;
}

.hot-mount {
    font-size: 9px;
    color: rgba(167, 165, 165, 1);
    margin-bottom: 6px;
}

.hot-money {
    color: rgba(249, 108, 47, 1);
    font-weight: 400;
    font-size: 10px;
    font-weight: bold;
}

.sub-title-list {
    font-size: 14px;
    color: rgba(167, 165, 165, 1);
    font-weight: 500;
    overflow: hidden
}

.sub-title-list span {
    padding: 0 10px;
    border-left: 1px solid rgba(167, 165, 165, 1);
}

.all {
    /* width: 351px; */
    margin: 8px auto 0;
    height: auto;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start; */
    min-height: 100px;
    overflow: hidden;
}

.goods-list {
    float: right;
    border-radius: 11px;
    background-color: #fff;
    width:calc(50% - 10px);
    /* height: 182px; */
    height: auto;
    box-sizing: border-box;
    /* margin-bottom: 7px; */
    margin: 5px;
}
.goods-list:nth-child(2n+1) {
    float:right;
    clear: right;
}

.goods-list:nth-child(2n) {
    float:left;
    clear: left;
}

.goods-sub-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 12px;
    color: rgb(50, 51, 52, 1);
    padding: 10px;
}

.goods-mount {
    font-size: 10px;
    color: rgba(167, 165, 165, 1);
    margin-bottom: 10px;
}

.goods-price {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    color: rgba(249, 108, 47, 1);
    font-size: 13px;
    width: 100%;
}

.goods-cart-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgba(249, 108, 47, 1);
    margin-right: 10px;

}

.goods-cart-icon:hover {
    background-color: rgba(249, 108, 47, 0.5);
    transition: all .5s ease-in;
}



.hot-imgage {
    aspect-ratio: 4/3;
}

@supports(aspect-ratio: 1) {
    .hot-imgage {
        aspect-ratio: 4/3;
        padding-top: initial;
    }
}

.thubm-img .img {
    width:100%;
    /* aspect-ratio: 4/3;
     */
     height: auto;
    padding-top: initial
}
</style>