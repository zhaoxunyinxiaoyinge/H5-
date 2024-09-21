<template>
  <div class="reply">
    <div class="reply-content">
      <div class="title">
        <span>商品评价</span>
        <span class="goods" @click="hanleGoodsComment">一键好评</span>
      </div>
      <div class="list">
        <div class="list-item" :key="item.id" v-for="item in goodsList">
          <div class="list-item-goods">
            <div class="list-item-left">
              <van-image width="50px" height="50px" :src="item.image" round></van-image>
              <span class="name">{{ item.name }}</span>
            </div>
            <div class="list-item-right">
              <van-icon name="good-job" :color="item.isGood === false ? 'red' : ''" class="bag"
                @click="bagComment(index, item)" />
              <van-icon class="good" name="good-job" :color="item.isGood === true ? 'red' : ''"
                @click="goodComment(index, item)" />
            </div>
          </div>
          <div class="comments-btn">
            <van-button class="btn" @click.stop.capture="handleButton(item, sItem)" :size="'small'"
              :type="hasCheck(item, sItem.id) ? 'success' : 'default'" :key="sIndex"
              v-for=" (sItem, sIndex) in markList['goods_id' + item.goods_id]">{{ sItem.mark_name }}</van-button>
          </div>
          <div class="reply-text">
            <div class="textrea">
              <van-cell-group inset :border="false">
                <van-field v-model="item.comment_text" rows="2" autosize label="留言" type="textarea" maxlength="50"
                  placeholder="请输入留言" show-word-limit>
                </van-field>
              </van-cell-group>
            </div>
            <div class="reply-image">
              <van-uploader v-model="item.fileList" multiple :max-count="6"
                :after-read="(file) => afterRead(file, item)" />
              <div>上传图片或者视频，更能帮助他人更容易了解商品</div>
            </div>
          </div>
        </div>
      </div>
      <van-button type="success" block @click="handleCommit">发表评论</van-button>
    </div>

  </div>
</template>
<script setup>
import { defineOptions, ref, onActivated } from "vue";
import { getDetialByOrderId, getMarkByScore, commitComment,createMarkAndComment} from "./api/index"
import { uploadFiles } from "./../../serve/api"
import { useRoute,useRouter } from "vue-router"


defineOptions({ name: "goods-reply" });
onActivated(async () => {
  document.title = '商品评论'
  const { id } = route.query;
  order_id.value=id;
  await getGoods({ order_id: id })
})

const route = useRoute();
const router=useRouter();
// 商品列表
const goodsList = ref([]);
//标签列表
const markList = ref({});
const order_id=ref();

const getGoods = async (params) => {
  let res = await getDetialByOrderId(params);
  goodsList.value.push(...res.data);
  goodsList.value.forEach(item => {
    item.isGood = null;
    item.fileList = [];
    item.mark = {
      goods: new Set(),
      bags: new Set()
    };
    item.comment_text = ""
  })
}


const commentComit = ref([]);


const bagComment = async (index, item) => {
  item.isGood = false;
  let res = await getMarkByScore({ score: 0, goods_id: item.goods_id });
  markList.value["goods_id" + item.goods_id] = [];
  markList.value["goods_id" + item.goods_id].push(...res.data);
}

const goodComment = async (index, item) => {
  item.isGood = true;
  let res = await getMarkByScore({ score: 1, goods_id: item.goods_id });
  markList.value["goods_id" + item.goods_id] = [];
  markList.value["goods_id" + item.goods_id].push(...res.data);
}

const afterRead = async (file, item) => {
  const len = file.file.name.lastIndexOf(".");
  const nameKey = file.file.name.slice(0, len);
  let res = await uploadFiles({ [nameKey]: file.file });
  item.fileList.pop();
  item.fileList.push({ name: nameKey, url: "https://"+res.Location });
}


const hanleGoodsComment = () => {
  let arr = [];
  goodsList.value.forEach(item => {
    item.isGood = true;
    arr.push(getMarkByScore({ goods_id: item.goods_id, score: 1 }))
    commentComit.value.push({
      commet_score: 1,
      order_id: item.order_id,
      goods_id: item.goods_id
    })
    markList.value["goods_id" + item.goods_id] = [];
  });

  let markKeys = Object.keys(markList.value);
  Promise.all(arr).then((data) => {
    data.forEach((item, index) => {
      markList.value[markKeys[index]].push(...data[index].data);
    })
  })
}

const hasCheck = (item, id) => {
  const checked = item.isGood == true ? item.mark.goods.has(id) : item.isGood == false ? item.mark.bags.has(id) : false;
  console.log(checked);
  return checked;
}

const handleButton = (item, sItem) => {
  if (item.isGood) {
    item.mark.goods.has(sItem.id) ? item.mark.goods.delete(sItem.id) : item.mark.goods.add(sItem.id);
  } else {
    item.mark.bags.has(sItem.id) ? item.mark.bags.delete(sItem.id) : item.mark.bags.add(sItem.id);
  }
}

const handleCommit = async () => {
  let arr = [];
  let goodsMarkId = new Map();
  goodsList.value.forEach(item => {
    arr.push(commitComment({
      comment_text: item.comment_text, commet_score: item.commet_score, order_id: item.order_id, goods_id: item.goods_id,
      comment_img: item.fileList.length > 0 ? item.fileList.map(sItem => sItem.url).join(",") : ''
    }));

    if (!goodsMarkId.has(item.goods_id)) {
        goodsMarkId.set(item.goods_id, []);
    }
    let markArr = goodsMarkId.get(item.goods_id);
      markArr.push(item.isGood ? Array.from(item.mark.goods) : Array.from(item.mark.bags));
      goodsMarkId.set(item.goods_id, markArr);
  })
  Promise.all(arr).then(res=>{
    let commentMarks=[];
    res.forEach(item=>{
      let arr=goodsMarkId.get(item.goods_id);
      arr.forEach(sItem=>{
          commentMarks.push(createMarkAndComment({mark_id:sItem,comment_id:item.id}));
      })
    })
    return Promise.all(commentMarks)
  }).then(res=>{
    router.push({path:'/comment',query:{order_id:order_id.value}})
    console.log(res,"res");
  })
}

</script>

<style lang="css" scoped>
.reply {
  background-color: #eff2f5;
  min-height: 100vh;
  padding: 0 3px;
}

.reply-content {
  margin: 10px 5px;
}

.list {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  /* margin-top: 10px; */
  margin-bottom: 20px;
}

.title {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 5px 0;
  align-items: center;
}

.name {
  font-weight: bold;
  margin-left: 20px;
}

.goods {
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 12px;
  border: 1px solid rgb(222, 238, 238);
  background-color: #fff;
}

.list-item {
  margin: 20px 0;
}

.list-item-goods {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  border-bottom: 1px solid #eff2f5;
  padding: 5px 0;
}

.list-item-left {
  display: flex;
  align-items: center;
}

.textrea {
  background-color: #eff2f5;
}

.reply-text {
  font-size: 12px;
}

.reply-image {
  margin-top: 10px;
}

.van-cell-group--inset {
  margin: 0px;
}

.van-cell {
  background-color: #eff2f5;
}

.comments-btn {
  display: flex;
  font-size: 12px;
  margin: 10px 0;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.btn {
  margin-right: 10px;
  margin-bottom: 10px;
}

.bag {
  transform: rotate(180deg);
  padding: 3px;
}

.good {
  padding: 3px;
}
</style>
