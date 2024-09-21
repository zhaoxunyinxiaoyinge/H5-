<template>
    <div class="my-order">
        <van-tabs v-model:active="activeName" sticky @change="handleChange">
            <van-tab title="全部" name="a">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list offset="50" v-model:loading="loading" :finished="finished" :finished-text="list.length>0&&finished==true?'没有更多了':''"
                        @load="onLoad">
                        <div class="content" >
                            <div class="order-list" :key="item.id" v-for="item in list">
                                <p class="order-title">
                                    <span class="order-desc">
                                        订单编号:<i>{{ item.number }}</i>
                                    </span>
                                    <span class="order-status">
                                        {{ item.status == 1 ? "待支付" : item.status == 2 ? "已支付" : "已完成" }}
                                    </span>
                                </p>
                                <div class="order-goods" :key="sItem.id" v-for="sItem in item.order_details">
                                    <van-image width="100px" height="69px" :src="sItem.image"></van-image>
                                    <div class="order-goods-info">
                                        <p>{{ sItem.name }}</p>
                                        <p>{{ sItem.number }}份</p>
                                    </div>
                                </div>
                                <p class="order-info">
                                    <span class="order-time">下单日期:<time>{{ fiterTime(item.order_time) }}</time></span>
                                    <span class="order-goods-mount"><em>{{ item.order_details.reduce((cur, next) => cur + next.number, 0)
                                            }}</em>件商品共:<i class="money">￥:{{ item.amount / 100 }}</i></span>
                                </p>
                                <p class="opreatin">
                                    <button class="del btn" v-if="item.status == 3"> 删除</button>
                                    <button class="comment btn" @click="handleReply({})"
                                        v-if="item.status == 3">去评论</button>
                                    <button class="comment btn" @click="handleReply({})"
                                        v-else-if="item.status == 1">去支付</button>
                                </p>
                            </div>
                        </div>
                        <van-empty description="暂无数据" v-if="list.length==0&&finished==true" /> 
                    </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="待付款" name="b">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list v-model:loading="loading" :finished="finished" :finished-text="list.length>0&&finished==true?'没有更多了':''" @load="onLoad">
                        <div class="content">
                            <div class="order-list" :key="item.id" v-for="item in list">
                                <p class="order-title">
                                    <span class="order-desc">
                                        订单编号:<i>{{ item.number }}</i>
                                    </span>
                                    <span class="order-status">
                                        {{ item.status == 1 ? "待支付" : item.status == 2 ? "已支付" : "已完成" }}
                                    </span>
                                </p>
                                <div class="order-goods" :key="sItem.id" v-for="sItem in item.order_details">
                                    <van-image width="100px" height="69px" :src="sItem.image"></van-image>
                                    <div class="order-goods-info">
                                        <p>{{ sItem.name }}</p>
                                        <p>{{ sItem.number }}份</p>
                                    </div>
                                </div>
                                <p class="order-info">
                                    <span class="order-time">下单日期:<time>{{ fiterTime(item.order_time) }}</time></span>
                                    <span class="order-goods-mount"><em>{{ item.order_details.reduce((cur, next) => cur + next.number, 0)
                                            }}</em>件商品共:<i class="money">￥:{{ item.amount / 100 }}</i></span>
                                </p>
                                <p class="opreatin">
                                    <button class="del btn" v-if="item.status == 3"> 删除</button>
                                    <button class="comment btn" @click="handleReply({})"
                                        v-if="item.status == 3">去评论</button>
                                    <button class="comment btn" @click="handleReply({})"
                                        v-else-if="item.status == 1">去支付</button>
                                </p>
                            </div>
                        </div> 
                        <van-empty description="暂无数据" v-if="list.length==0&&finished==true" /> 
                    </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="待发货" name="c">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list v-model:loading="loading" :finished="finished" :finished-text="list.length>0&&finished==true?'没有更多了':''" @load="onLoad">
                        <div class="content">
                            <div class="order-list" :key="item.id" v-for="item in list">
                                <p class="order-title">
                                    <span class="order-desc">
                                        订单编号:<i>{{ item.number }}</i>
                                    </span>
                                    <span class="order-status">
                                        {{ item.status == 1 ? "待支付" : item.status == 2 ? "已支付" : "已完成" }}
                                    </span>
                                </p>
                                <div class="order-goods" :key="sItem.id" v-for="sItem in item.order_details">
                                    <van-image width="100px" height="69px" :src="sItem.image"></van-image>
                                    <div class="order-goods-info">
                                        <p>{{ sItem.name }}</p>
                                        <p>{{ sItem.number }}份</p>
                                    </div>
                                </div>
                                <p class="order-info">
                                    <span class="order-time">下单日期:<time>{{ fiterTime(item.order_time) }}</time></span>
                                    <span class="order-goods-mount"><em>{{ item.order_details.reduce((cur, next) => cur + next.number, 0)
                                            }}</em>件商品共:<i class="money">￥:{{ item.amount / 100 }}</i></span>
                                </p>
                                <p class="opreatin">
                                    <button class="del btn" v-if="item.status == 3"> 删除</button>
                                    <button class="comment btn" @click="handleReply({})"
                                        v-if="item.status == 3">去评论</button>
                                    <button class="comment btn" @click="handleReply({})"
                                        v-else-if="item.status == 1">去支付</button>
                                </p>
                            </div>
                        </div>
                        <van-empty description="暂无数据" v-if="list.length==0&&finished==true" /> 
                    </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="待收货" name="d">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list v-model:loading="loading" :finished="finished" :finished-text="list.length>0&&finished==true?'没有更多了':''" @load="onLoad">
                        <div class="content">
                            <div class="order-list" :key="item.id" v-for="item in list">
                                <p class="order-title">
                                    <span class="order-desc">
                                        订单编号:<i>{{ item.number }}</i>
                                    </span>
                                    <span class="order-status">
                                        {{ item.status == 1 ? "待支付" : item.status == 2 ? "已支付" : "已完成" }}
                                    </span>
                                </p>
                                <div class="order-goods" :key="sItem.id" v-for="sItem in item.order_details">
                                    <van-image width="100px" height="69px" :src="sItem.image"></van-image>
                                    <div class="order-goods-info">
                                        <p>{{ sItem.name }}</p>
                                        <p>{{ sItem.number }}份</p>
                                    </div>
                                </div>
                                <p class="order-info">
                                    <span class="order-time">下单日期:<time>{{ fiterTime(item.order_time) }}</time></span>
                                    <span class="order-goods-mount"><em>{{ item.order_details.reduce((cur, next) => cur + next.number, 0)
                                            }}</em>件商品共:<i class="money">￥:{{ item.amount / 100 }}</i></span>
                                </p>
                                <p class="opreatin">
                                    <button class="del btn" v-if="item.status == 3"> 删除</button>
                                    <button class="comment btn" @click="handleReply({})"
                                        v-if="item.status == 3">去评论</button>
                                    <button class="comment btn" @click="handleReply({})"
                                        v-else-if="item.status == 1">去支付</button>
                                </p>
                            </div>
                        </div>
                        <van-empty description="暂无数据" v-if="list.length==0&&finished==true" /> 
                    </van-list>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="已完成" name="e">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list v-model:loading="loading" :finished="finished" :finished-text="list.length>0&&finished==true?'没有更多了':''" @load="onLoad">
                        <div class="content">
                            <div class="order-list" :key="item.id" v-for="item in list">
                                <p class="order-title">
                                    <span class="order-desc">
                                        订单编号:<i>{{ item.number }}</i>
                                    </span>
                                    <span class="order-status">
                                        {{ item.status == 1 ? "待支付" : item.status == 2 ? "已支付" : "已完成" }}
                                    </span>
                                </p>
                                <div class="order-goods" :key="sItem.id" v-for="sItem in item.order_details">
                                    <van-image width="100px" height="69px" :src="sItem.image"></van-image>
                                    <div class="order-goods-info">
                                        <p>{{ sItem.name }}</p>
                                        <p>{{ sItem.number }}份</p>
                                    </div>
                                </div>
                                <p class="order-info">
                                    <span class="order-time">下单日期:<time>{{ fiterTime(item.order_time) }}</time></span>
                                    <span class="order-goods-mount"><em>{{ item.order_details.reduce((cur, next) => cur + next.number, 0)
                                            }}</em>件商品共:<i class="money">￥:{{ item.amount / 100 }}</i></span>
                                </p>
                                <p class="opreatin">
                                    <button class="del btn" v-if="item.status == 3"> 删除</button>
                                    <button class="comment btn" @click="handleReply({})"
                                        v-if="item.status == 3">去评论</button>
                                    <button class="comment btn" @click="handleReply({})"
                                        v-else-if="item.status == 1">去支付</button>
                                </p>
                            </div>
                        </div>
                        <van-empty description="暂无数据" v-if="list.length==0&&finished==true" /> 
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { Tab, Tabs } from "vant";
import { ref, onMounted, onActivated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getOrder } from "./../settlement/api/index"
import moment from "moment";
document.title = '我的订单'
export default {
    name: "MyOrder",
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs
    },
    setup() {
        const activeName = ref("a");
        const refreshing = ref(false);
        const loading = ref(false);
        const finished = ref(false);
        const list = ref([]);

        const routes = useRoute();
        const rotuer = useRouter();

        const total = ref(0);
        const listQuery = ref({
            offset: 0,
            limit: 10,
            status: ""
        })

        const onLoad = async () => {
            await getAllOrders();
        }

        const onRefresh = async () => {
            // 清空数据
            list.value.length = 0;
            finished.value = false;
            loading.value = true;
            refreshing.value = false;
            await onLoad();
        }

        onMounted(async () => {
            loading.value = true;
            document.title='我的订单'
            // await getAllOrders();
        })

        onActivated(() => {
            activeName.value = routes && routes.query.tab;
        })

        const handleChange = async() => {
            let len=list.value.length;
            list.value.splice(0,len);
            finished.value = false;
            total.value=0;
            loading.value=true;
            listQuery.value.offset=0;
            listQuery.value.limit=10;
            const activeMap = {
                "a": null,
                "b": 1,
                "c": 2,
                "d": 3,
                "e": 4
            }
            listQuery.value.status=activeMap[activeName.value];
           await getAllOrders();
        }

        const onClickLeft = () => {
            rotuer.back();
        }

        const handleReply = () => {
            rotuer.push({ path: "/reply", query: { id: 2 } });
        }


        const getAllOrders = async () => {
            let res = await getOrder({ ...listQuery.value });
            loading.value = false;
            if (res.code == 1) {
                total.value = res.data.total;
                list.value.push(...res.data.rows);
                finished.value = hasComplete(total.value, list.value);
            }
        }

        const hasComplete = (total, data) => {
            return total === data.length;
        }

        const fiterTime = (time) => {
            return moment(time).format("yyyy-MM-DD h:mm:ss");
        }

        return {
            activeName,
            refreshing,
            loading,
            finished,
            list,
            total,
            listQuery,

            onRefresh,
            onLoad,
            handleChange,
            onClickLeft,
            handleReply,
            getAllOrders,
            hasComplete,
            fiterTime
        }
    }
}

</script>

<style scoped>
.content {
    padding-top: 14px;
}

.order-list {
    width: 351px;
    margin: 0 auto 10px;
    box-sizing: border-box;
    padding: 17px 14px 17px 17px;
    background-color: #fff;
    border-radius: 10px;
}

.order-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.order-desc {
    font-size: 11px;
    color: rgba(50, 51, 52, 1);
}

.order-status {
    color: rgba(249, 108, 47, 1);
    font-size: 11px;
}

.order-goods {
    display: flex;
    margin-bottom: 14px;

}

.order-goods-info {
    margin-left: 21px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 12px;
    flex: 1;
    text-align: left;
}

.order-info {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    margin-bottom: 12px;
}

.order-time {
    color: rgba(167, 165, 165, 1);
}

.order-goods-mount {
    color: rgba(50, 51, 52, 1);
}

.money {
    color: rgba(249, 108, 47, 1);
    font-style: normal;
}

.opreatin {
    display: flex;
    justify-content: flex-end;
}

.btn {
    width: 73px;
    height: 28px;
    border: none;
    line-height: 28px;
    text-align: center;
    border-radius: 15px;
    font-size: 12px;
    background-color: #fff;
    border: 1px solid rgba(151, 151, 151, 1);
    margin-left: 10px;
}

.comment {
    border-color: rgba(249, 108, 47, 1);
    color: rgba(249, 108, 47, 1)
}
</style>
