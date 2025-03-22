<script>
import { getSignStr } from "@/serve/api";
import wx from "weixin-js-sdk";
import { setConfig } from "@/utils/jsdkConfig.js"
// import Cookies from "js-cookies";
import { useRouter } from "vue-router"
// import { getAccessToken, getUserInfo } from "@/serve/api"
import { Button, Image, Icon, ConfigProvider, Dialog, Popup, Field, CellGroup, RadioGroup, Radio } from "vant";
import { ref, reactive, onMounted} from "vue"
import moment from "moment"
import Cookies from "js-cookies";


export default {
    components: {
        [Button.name]: Button,
        [Image.name]: Image,
        [Icon.name]: Icon,
        [ConfigProvider.name]: ConfigProvider,
        [Dialog.Component.name]: Dialog.Component,
        [Popup.name]: Popup,
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Radio.name]: Radio,
        [RadioGroup.name]: RadioGroup,
        [Button.name]: Button

    },
    name: 'userCenter',
    setup() {
        // const router = useRoute();
        const routers = useRouter();
        let url = window.location.href.split("#")[0]
        onMounted(async () => {
            document.title = "个人中心";
            console.log(345)
            let time = moment().unix();
            let str = await getNonceStr(time);
            setConfig(wx, str.signStr, time);

            let users=JSON.parse(Cookies.getItem("userinfo"));
           userInfo.value.nickname=users.nickname;
           userInfo.value.avatar=users.headimgurl;
        })
 

        /**
         * 
         * @param {Date} time - 时间对象
         * @result Promise<string>  - 签名
         */
        const getNonceStr = async (time) => {
            return await getSignStr({ noncestr: 'zxy123456com', timestamp: time, url: url });
        }
        const assets = 'assets';
        const pay = ref();
        const address = ref();
        const car = ref();
        const complete = ref();
        const fanxiang = ref();
        const header = ref();
        const send = ref();
        const setting = ref();
        const wenhao = ref();
        const show = ref(false);
        const showList = ref(false);
        


        const userInfo = ref({
            username: "xuajeu",
            password: "",
            phone: "",
            nickname: "",
            avatar:""
        });

        const fileItems=ref([]);

        const themeVars = reactive({
            cellIconSize: "14px"
        })

        const coupon = {
            available: 1,
            condition: '无门槛\n最多优惠12元',
            reason: '',
            value: 150,
            name: '优惠券名称',
            startAt: 1489104000,
            endAt: 1514592000,
            valueDesc: '1.5',
            unitDesc: '元',
        };

        const coupons = ref([coupon]);

        import(`./../../${assets}/pay.png`).then(res => {
            pay.value = res.default;
        })
        import(`./../../${assets}/address.png`).then(res => {
            address.value = res.default;
        })
        import(`./../../${assets}/car.png`).then(res => {
            car.value = res.default;
        })
        import(`./../../${assets}/complete.png`).then(res => {
            complete.value = res.default;
        })
        import(`./../../${assets}/fanxiang.png`).then(res => {
            fanxiang.value = res.default;
        })
        import(`./../../${assets}/header.png`).then(res => {
            header.value = res.default;
        })
        import(`./../../${assets}/send.png`).then(res => {
            send.value = res.default;
        })
        import(`./../../${assets}/setting.png`).then(res => {
            setting.value = res.default;
        })
        import(`./../../${assets}/wenhao.png`).then(res => {
            wenhao.value = res.default;
        })


        /**
         * @params none 
         * @result void
         */
        // let getAutorize = async () => {
        //     let code = "";
        //     if (!Cookies.getItem('token') && !router.query.code) {
        //         let path = window.location.href;
        //         let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxacd36442f62ad2b9"+"&redirect_uri="+path+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        //         window.location.replace(url);
        //     } else if (!Cookies.getItem("token") && router.query.code) {
        //         code = router.query.code;

        //         let data = await getAccessToken({ code, webToken: true });
        //         Cookies.setItem('token', data.data.access_token);
        //         Cookies.setItem('code', code);
        //         getUserInfos(data.data.access_token, data.data.openid)
        //     } else {
        //         let userinfo = Cookies.getItem('userinfo');
        //         let access_token = Cookies.getItem('token')
        //         getUserInfos(access_token, userinfo.openid);
        //     }
        // }

        /**
         * 
         * @param {string} token - 微信公众号token
         * @param {string} openid -微信公众号 openid 
         * @result userinfo -用户个人信息
        //  */
        // const getUserInfos = async function (token, openid) {
        //     try {
        //         let res = await getUserInfo({ userInfo: true, openid: openid, lang: "zh-CN", access_token: token });
        //         Cookies.setItem("userinfo", res.data.data)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }



        const handleAllOrder = () => {
            routers.push("/myOrder");
        }

        const handleWating = () => {
            routers.push({ path: "/myOrder", query: { tab: 'b' } });
        };
        const handleSend = () => {
            routers.push({ path: "/myOrder", query: { tab: 'c' } });
        };
        const handleGet = () => {
            routers.push({ path: "/myOrder", query: { tab: 'd' } });
        };
        const handleComplete = () => {
            routers.push({ path: "/myOrder", query: { tab: 'e' } });
        };

        const handleSetting = () => {
            // show.value = true;
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    console.log(result, 7777)
                }
            });

        }

        const handleSubmit=()=>{

        }

        const logout = () => {
            Dialog.alert({
                message: "确认退出登录？",
            })
                .then(() => {
                    // on confirm
                    routers.push("/login")
                })
                .catch(() => {
                    // on cancel
                });
        }

        const handleCoupon = () => {
            showList.value = true;
        }

        const handleShow = () => {
            routers.push("/address");
        };

        const handleJumTAccount = () => {
            routers.push("/account")
        }

        const handleShare=()=>{
        }

        return {
            getNonceStr,
            pay,
            address,
            complete,
            fanxiang,
            header,
            send,
            setting,
            wenhao,
            car,
            themeVars,
            show,
            showList,
            coupons,
            userInfo,
            fileItems,


            handleAllOrder,
            handleWating,
            handleSend,
            handleGet,
            handleComplete,
            logout,
            handleShow,
            handleSetting,
            handleCoupon,
            handleJumTAccount,
            handleSubmit,
            handleShare
        }
    }
}
</script>
<template>
    <van-config-provider :theme-vars="themeVars">
        <div class="page">
            <div class="bg">
                <van-image round width="66" height="66" :src="userInfo.avatar" />
                <span class="nickname">{{ userInfo.nickname }}</span>
                <span class="signname">今天是一个好日子</span>
            </div>
            <div class="example-list">
                <div class="example-list-item" @click="handleJumTAccount">
                    <span class="mount">234.00</span>
                    <span class="cartgory">账户余额</span>
                </div>
                <div class="example-list-item" @click="handleCoupon">
                    <span class="mount">1</span>
                    <span class="cartgory">优惠卷</span>
                </div>
                <div class="example-list-item">
                    <span class="mount">29</span>
                    <span class="cartgory">我的足迹</span>
                </div>
            </div>

            <div class="myorder">
                <div class="order-title">
                    <span class="h3">我的订单</span>
                    <span @click="handleAllOrder">全部
                        <van-icon class="all" name="arrow" />
                    </span>
                </div>
                <div class="order-list">
                    <div class="order-list-item" @click="handleWating">
                        <van-image width="24" :src="pay" height="24"> </van-image>
                        <span class="order-text">待付款</span>
                    </div>
                    <div class="order-list-item" @click="handleSend">
                        <van-image width="24" :src="send" height="24"></van-image>
                        <span class="order-text">代发货</span>
                    </div>
                    <div class="order-list-item" @click="handleGet">
                        <van-image width="24" :src="car" height="24"></van-image>
                        <span class="order-text">待收货</span>
                    </div>
                    <div class="order-list-item" @click="handleComplete">
                        <van-image width="24" :src="complete" height="24"></van-image>
                        <span class="order-text">已完成</span>
                    </div>
                </div>
            </div>
            <div class="setting">
                <div class="setting-list" @click="handleShow">
                    <van-image width="15" :src="address" height="15"></van-image>
                    <van-cell class="cell" title="我的地址" is-link />
                </div>
                <div class="setting-list" @click="handleShare">
                    <van-image width="15" :src="wenhao" height="15"></van-image>
                    <van-cell class="cell" title="常见问题" is-link />
                </div>
                <div class="setting-list" @click="handleSetting">
                    <van-image width="15" :src="setting" height="15"></van-image>
                    <van-cell class="cell" title="设置" is-link />
                </div>
                <div class="setting-list" @click="logout">
                    <van-image width="15" :src="fanxiang" height="15"></van-image>
                    <van-cell class="cell" title="退出登录" is-link />
                </div>
            </div>
        </div>
        <van-popup v-model:show="show" position="right" teleport="body" :style="{ width: '100%', height: '100%' }">
            <div class="title"><van-icon name="completed-o" /><span>用户信息</span></div>
            <van-cell-group inset>
                <van-field v-model="userInfo.username" required label="用户名" placeholder="请输入用户名" />
                <van-field v-model="userInfo.nickname" required label="用户昵称" placeholder="请输入昵称" />
                <van-field v-model="userInfo.phone" required label="手机号" placeholder="请输入手机号" />
                <van-field v-model="userInfo.password" required label="用户密码" placeholder="请输入手机号" />
                <van-field required name="uploader" label="用户头像">
                    <template #input>
                        <van-uploader v-model="fileItems" />
                    </template>
                </van-field>
                <van-field>
                    <template #input>
                        <van-button size="small"  @click="handleSubmit" block type="success" native-type="submit">
                            提交
                        </van-button>
                    </template>
                </van-field>
            </van-cell-group>
        </van-popup>
        <!-- 优惠卷 -->
        <van-popup v-model:show="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
            <van-coupon-list :coupons="coupons" :disabled-coupons="disabledCoupons" :show-close-button="false" />
        </van-popup>
    </van-config-provider>
</template>
<style scoped>
.page {
    background-color: #eee;
    min-height: calc(100vh - 51px);
    padding-bottom: 7px;
}

.bg {
    /* padding-top: 61px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(250, 149, 106, 1);
    /* padding: 4rem 0; */
    height: 202px;
    border-radius: 0 0 28px 28px;

}

.info-list {
    margin: 1rem 0;
}

.an-cell {
    display: flex;
    justify-content: space-between;
}

.custom .van-cell__title {
    text-align: left;
}

.nickname {
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    margin-bottom: 8px;
    margin-top: 13px;
}

.signname {
    color: #eee;
    font-size: 11px;
    color: rgba(255, 255, 255, 1);
    font-weight: 400;
    margin-bottom: 13px;
}

.example-list {
    margin: -39px auto 0;
    width: 351px;
    height: 66px;
    background-color: #fff;
    border-radius: 11px;
    box-sizing: border-box;
    padding: 14px 0;
    display: flex;
    justify-content: space-evenly;
}

.example-list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgba(299, 299, 299, 1);
    color: #000
}

.example-list-item:last-child {
    border-right: none;
}

.example-list-item .cartgory {
    font-size: 12px;
    margin-top: 11px;
}

.example-list-item .mount {
    font-size: 14px;
    color: rgba(249, 108, 47, 1);
    font-weight: 500;
}

.all {
    margin-left: 5px;
}

.myorder {
    width: 351px;
    height: 120px;
    border-radius: 11px;
    background-color: #fff;
    margin: 7px auto 0;
    box-sizing: border-box;
    padding: 19px 14px 14px;
}

.order-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: rgba(167, 165, 165, 1);
}

.order-title .h3 {
    font-size: 14px;
    font-weight: 500;
    color: rgba(50, 51, 52, 1);
    line-height: 14px;
}

.order-list {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.order-list-item {

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.order-list-item .order-text {
    font-size: 12px;
    color: rgba(50, 51, 52, 1);
    margin-top: 14px;
}

.setting {
    width: 351px;
    background-color: #fff;
    border-radius: 11px;
    margin: 7px auto 0px;
    box-sizing: border-box;
    padding: 7px 14px 17px 19px;
    overflow: hidden;
}

.setting-list {
    display: flex;
    align-items: center;
}

.title {
    padding: 20px;
    font-size: 14px;
    line-height: 30px;
    display: flex;
}
</style>

<style>
.cell {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cell .van-cell__title {
    text-align: left;
}
</style>