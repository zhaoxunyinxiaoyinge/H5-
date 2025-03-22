<template>
  <div class="good-detail">
      <van-image width="100%"
        height="auto"
        fit="contain"
        :src="goodsDetail?goodsDetail.img_url:''"> </van-image>
  <div class="content-box">
      <div class="goods-name">
        <span>商品名称:&nbsp;{{ goodsDetail&& goodsDetail.name }}</span>
     </div>
    <div class="goods-text">
      描述:&nbsp;
      <span v-html="goodsDetail.descrtion" v-if="goodsDetail"></span></div>
    <div class="goods-content">
      <div class="title">数量:&nbsp;<span class="mount">{{  goodsDetail&&goodsDetail.mount }}</span></div>
      <div class="title">价格:&nbsp;<span class="price">￥{{ goodsDetail&& goodsDetail.price }}</span></div>
    </div>
  </div>
  <div class="reply">
       <div class="goods-name"><span class="tip">全部评价({{ comments.count }})</span><span @click="handleJumpToComment" class="more">查看更多<van-icon name="arrow" /></span></div>
       <div class="goods-mark">
          <van-list v-if="comments.count>0">
            <div class="reply-item">
              <div class="reply-user">
                <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" width="30px" height="30px" round></van-image>
                <div class="reply-user-info">
                  <div class="reply-user-name">赵训银</div>
                  <div class="reply-time">{{getFormatTime(comments.data.create_time)}}</div>
                </div>   
              </div>
              <div class="reply-content">
                <p class="reply-desc">{{ comments.data.comment_text}}</p>
                <div class="reply-image" v-if="comments.data.comment_img">
                  <div class="reply-image-item" :key="index" v-for="(sItem,index) in  comments.data.comment_img.split(',')"><van-image :src="sItem" width="80px" height="80px" ></van-image></div>
                </div>
              </div>
              <div class="reply-score">
                <van-icon name="good-job-o" />
                 <span>{{ comments.data.commet_score==1?'好评':'差评' }}</span>
              </div>
            </div>
          </van-list>
          <van-empty v-else description="暂无评论" />
       </div>
    </div>
  <van-action-bar >
    <van-action-bar-icon icon="wap-home-o" text="首页" @click="jumToIndex" />
    <van-action-bar-icon icon="cart-o" :badge="num" text="购物车" @click="jumToCart" />
    <van-action-bar-button type="danger" text="加入购物车" @click="onClickButton" />
</van-action-bar>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import {Image, ActionBar, ActionBarIcon, ActionBarButton,List,Button,Empty  } from "vant"
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex"
import { computed } from 'vue';
import { ref } from 'vue';
import {getGoodsDetail,getCommentByGoodsId} from "./api/index";
import { onActivated,onDeactivated } from 'vue';
import {useUtils} from "./../../utils/useUtils";

  export default defineComponent({
    name:'good-detail',
    components:{
      [Image.name]: Image,
      [ActionBar.name]:ActionBar,
      [ActionBarButton.name]:ActionBarButton,
      [ActionBarButton.name]:ActionBarIcon,
      [List.name]:List,
      [Button.name]:Button,
      [Empty.name]:Empty
    },
    setup(){
      onActivated( async()=>{
      document.title='商品详情'
       let params=route.query;
       if(params&&params.id!=null){
          await getDataDetail(params.id);
          await getComemnts(params.id);
       }
      })

      onDeactivated(()=>{
          comments.value.data=[];
          comments.value.count=0;
          goodsDetail.value={};
      })

     const router= useRouter();
     const route=useRoute();
     const store=useStore();
     const goodsDetail=ref();
     const comments=ref({data:{},count:0});
     const {getFormatTime,isObjectNull}=useUtils();

     const getDataDetail= async(id)=>{
       let res=await getGoodsDetail({id});
       if(res.code==1){
          goodsDetail.value=res.data[0];
       }
     }

     const getComemnts=async(goodsId)=>{
      console.log(goodsId);
        let res=await getCommentByGoodsId({goods_id:goodsId});
        if(res.code==1){
          if(isObjectNull(res.data.data[0])){
            comments.value.data=res.data.data[0];
            comments.value.count=res.data.count;
          }
        }
     }


      const onClickLeft=()=>{
        router.back();
      }

      const onClickButton=()=>{
          store.commit("addCartGoods",goodsDetail.value);
      }

      const jumToCart=()=>{
          router.push("/cart")
      }
      const jumToIndex=()=>{
        router.push("/index")
      }

      const handleJumpToComment=()=>{
        router.push({path:"/comment",query:{id:goodsDetail.value.id}})
      }

      return {
        goodsDetail,
        comments,
        onClickLeft,
        onClickButton,
        jumToCart,
        jumToIndex,
        num:computed(()=>store.getters.cartGoodsNum),
        handleJumpToComment,
        getFormatTime
      }
    }

  })
</script>

<style lang="scss" scoped>
  .good-detail {
    background-color: #f7f8fa;
    min-height: 100vh;
    padding-bottom: 40px;
  }
  .content-box {
    width: calc(100vw - 20px);
    box-sizing: border-box;
    margin:10px 10px;
    padding: 10px;
    background-color:#fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .goods-name {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    .tips {
          font-size: 14px;   
          color:#000;    
          font-weight: bolder;
    }
    .more {
      font-size: 12px;
      color: #4b48489d;
    }
  } 
  .goods-text {
      display: flex;
      font-size: 12px;
      color:#000;
    }
  .goods-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    align-items: center;

    .title {
      font-size: 12px;
    }
    .mount {
      font-size: 12px;
      font-weight: bold;
    }
    .price {
      color:red;
      font-size: 14px;
    }
  }
  .reply {
    margin: 10px 10px 0px;
    background-color: #fff;
    padding: 10px;
    .mark-list {
      padding-top: 5px;
    }
    .reply-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top:10px;
      border-bottom: 1px solid #f7f8fa;
      position:relative;
    }

    .reply-score {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 10px;
        top: 10px;
        border-radius: 5px;
        padding: 5px 8px;
        font-size: 12px;
        background-color: rgba(243, 202, 68, 0.146);
        color:orange
    }
    .reply-user {
      display: flex;
      font-size: 12px;
      .reply-user-info {
        margin-left: 10px;
      }
      .reply-user-name {
        font-weight: bold;
        line-height: 16px;
      }
    }
    .reply-content {
      display: flex;
      flex-direction: column;
      .reply-desc {
        font-size: 12px;
        line-height: 24px;
      }
      .reply-image {
        display: flex;
        flex-direction: row;
      }
      .reply-image-item {
        margin-right: 5px;
      }
    }
  }
</style>