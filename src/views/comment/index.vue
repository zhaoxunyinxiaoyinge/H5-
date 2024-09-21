<template>
  <div class="comment">
    <div class="query-list">
      <span class="btn" @click="queryComent()">全部{{ comments.count }}</span>
      <span class="btn" @click="queryComent()">最新{{ comments.count }}</span>
      <span class="btn" @click="queryComent({comment_img:true})"><van-icon name="photo-o" size="mini" /> &nbsp;有图</span>
      <span class="btn" @click="queryComent({mark_id:4})"><van-icon name="good-job-o" /> &nbsp;使用方便</span>
      <span class="btn" @click="queryComent({commet_score:0})">不满意</span>
    </div>
    <div class="list">
      <van-list>
        <div class="reply-item" :key="item.id" v-for="item in comments.data">
          <div class="reply-user">
            <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" width="30px" height="30px"
              round></van-image>
            <div class="reply-user-info">
              <div class="reply-user-name">赵训银</div>
              <div class="reply-time">{{getFormatTime(item.create_time)}}</div>
            </div>
          </div>
          <div class="reply-content">
            <p class="reply-desc">{{ item.comment_text }}</p>
            <div class="reply-image">
              <div class="reply-image-item"><van-image :src="item.comment_img" width="80px" height="80px"></van-image>
              </div>
            </div>
            <div class="reply-score">
              <van-icon name="good-job-o" />
              <span>{{ item.commet_score == 1 ? '好评' : '差评' }}</span>
            </div>
          </div>
        </div>
        <van-empty v-if="comments.data.length==0" description="暂无评论" />
      </van-list>
    </div>
    <div class="bottom">
      <van-icon class="icon" name="cart-o" :color="'#000'" :badge="4" />
      <div class="cart-btn">加入购物车</div>
    </div>
  </div>
</template>
<script>
import { NavBar,Empty} from "vant"
import { useRouter, useRoute } from "vue-router"
import { getCommentByGoodsId } from "./../goodDetail/api/index";
import { ref, onActivated, onDeactivated } from "vue"
import {useUtils} from "./../../utils/useUtils.js"
export default {
  name: "comment-show",
  components: {
    [NavBar.name]: NavBar,
    [Empty.name]:Empty
  },
  setup() {

    let router = useRouter();
    const route = useRoute();
    const comments = ref({ data: [], count: 0 })
    const goodsId=ref();
    const {getFormatTime}=useUtils();

    onActivated(async () => {
      document.title='评论列表'
      let params = route.query;
      if (params && params.id) {
        goodsId.value=params.id;
        await getComemnts(params.id);
      }

    })

    onDeactivated(() => {
        comments.value.data=[];
        comments.value.count=0;
    })

    const getComemnts = async (goodsId) => {
      let res = await getCommentByGoodsId({ goods_id: goodsId });
      if (res.code == 1) {
        comments.value.data.push(...res.data.data);
        comments.value.count=res.data.count;
      }
    }

    const queryComent=async(params)=>{
      let res = await getCommentByGoodsId({ goods_id: goodsId.value,...params });
      let len=comments.value.data.length;
       comments.value.data.splice(0,len);
      if (res.code == 1) {
        comments.value.data.push(...res.data.data);
        comments.value.count=res.data.count;
      }
    }

    const onClickLeft = () => {
      router.back();
    }
    return {
      onClickLeft,
      comments,
      getFormatTime,
      queryComent
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  background: #e7e7e78f;
  ;
  min-height: 100vh;
}

.query-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

.btn {
  margin: 0px 5px 10px;
  display: block;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 12px;
  color: #333;
  background-color: #fff;

}

.list {
  margin: 0 8px;
}

.reply-item {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid #f7f8fa;
  position: relative;
  padding: 10px 5px;

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
  color: orange
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

.bottom {
  position: fixed;
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  bottom: 0px;
  left: 0;
  display: flex;
  background-color: #fff;
  align-items: center;

  .icon {
    font-size: 24px;
    color: #333;
    margin-right: 30px;
  }

  .cart-btn {
    line-height: 36px;
    font-size: 16px;
    flex: 1;
    background-color: rgb(12, 186, 12);
    text-align: center;
    color: #fff;
    border-radius: 15px;
  }
}
</style>