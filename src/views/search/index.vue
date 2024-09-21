<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="search">
      <van-search v-model="search" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
        @clear="handleClear" />
      <div class="content" v-if="goods.goods.length === 0 && !isCompleted && !loading">
        <div class="search-title">
          <div class="name">历史搜索</div>
          <div class="del" @click="handleDelHistory">
            <van-icon name="delete-o" />
          </div>
        </div>
        <div class="word-list">
          <div class="word" :key="index" @click="handleKeyWord(item)"  v-for="(item,index) in historyRecord">{{ item }}</div>
        </div>
        <div class="search-title">
          <div class="name">实时热搜</div>
        </div>
        <div class="word-list">
          <div class="word">香蕉</div>
          <div class="word">香蕉</div>
          <div class="word">香蕉</div>
        </div>
      </div>
      <div class="goods-list" v-if="search && !loading && goods.goods">
        <div class="list" v-if="goods.goods && goods.goods.length > 0">
          <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
            <van-card :num="items.mount" :price="items.price" currency="￥" :title="items.name"  class="card-text"  :key="index" v-for="(items,index) in goods.goods
            " :thumb="items.img_url"   :centered="false" >
            <template #price>
                <div>{{"￥"+items.price+".00" }}</div>
            </template>
            <template #desc> 
               <div v-html="items.descrtion"></div>
            </template>
            </van-card>
          </van-pull-refresh>
        </div>
        <div class="no-goods" v-if="goods.goods && goods.goods.length === 0 && isCompleted">
          <van-empty description="暂无数据" />
        </div>
      </div>
      <div v-if="loading" class="loading">
        <van-loading color="#0094ff" type="spinner" />
      </div>
    </div>
  </van-config-provider>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { Search, ConfigProvider, Empty, Loading, PullRefresh, Card } from "vant";
import {useRouter} from "vue-router"
import {getSearchGoods} from "./api"
import { onMounted } from "vue";
import Cookie from "js-cookies";

export default defineComponent({
  components: {
    [Search.name]: Search,
    [ConfigProvider.name]: ConfigProvider,
    [Empty.name]: Empty,
    [Loading.name]: Loading,
    [PullRefresh.name]: PullRefresh,
    [Card.name]: Card,

  },
  name: "search-page",
  setup() {
    const router=useRouter();
    const themeVars = reactive({
      background2: "green"
    })

    onMounted(()=>{
      document.title="搜素";
       let historys= Cookie.getItem("history");
        if(historys){
          historyRecord.value.push(...historys.split(","));
        }
    })

    const search = ref("")
    let goods = reactive({
      goods: []
    });

    const loading = ref(false);

    const isLoading = ref(false);

    const isCompleted = ref(false);

    let historyRecord=ref([]);


    const onCancel = () => {
      search.value = '';
      isCompleted.value = false;
      goods.goods.length = 0;
      router.back();
      
    }

    const onSearch =async () => {
      if (search.value === "") return
      if (loading.value) return
      loading.value = true;
      getSearchGoods({name:search.value}).then(res=>{
        if(res.code==1){
          let isexist=historyRecord.value.includes(search.value);
          if(!isexist){
            historyRecord.value.push(search.value);
          }
          Cookie.setItem("history",historyRecord.value);
          loading.value = false;
          goods.goods.push(...res.data);
          isCompleted.value = true; 
        }
      })
    }

    const onRefresh = () => {
      goods.goods.length=0;
      onSearch();
    }

    const handleClear=()=>{
        console.log(34566)
        search.value="";
        goods.goods.length=0;
        isCompleted.value=false;
    }

    const handleDelHistory=()=>{
         Cookie.removeItem("history");
         historyRecord.value.length=0;
    }

    const handleKeyWord=(keyword)=>{
        search.value=keyword;
        onSearch();
    }

    return {
      search,
      isCompleted,
      onCancel,
      loading,
      onSearch,
      themeVars,
      goods,
      onRefresh,
      isLoading,
      handleClear,
      historyRecord,
      handleDelHistory,
      handleKeyWord
    }
  }
})
</script>


<style scoped lang="scss">
.search {
  background-color: rgba(248, 249, 250, 1);
  height: 100vh;
}

.content {
  height: calc(100vh - 56px);
  box-sizing: border-box;
  padding: 17px 15px 0;
  background-color: #fff;

  .search-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .name {
      font-size: 15px;
      color: rgb(51, 51, 51);
      line-height: 21px;
    }
  }

  .word-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 23px;

    .word {
      padding: 6px 14px;
      border-radius: 14px;
      background-color: rgba(248, 249, 250, 1);
      color: rgba(102, 102, 102, 1);
      font-size: 11px;
      margin-right: 10px;
    }
  }
}

.card-text {
  text-align: left;
}


.list {
  background-color: #fff;
  height:calc(100vh -  60px );
  padding: 0  14px;
}


.loading {
  box-sizing: border-box;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  padding-top: 200px;
}
</style>