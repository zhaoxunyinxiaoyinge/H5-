<script>
import { Field, TreeSelect, ConfigProvider,List  } from 'vant';
import { ref, reactive, onMounted } from "vue";
import { getCategory, getGoodsList } from "./../index/api/index.js"
import {useRoute,useRouter } from 'vue-router';
import {useStore} from "vuex"

export default {
    name: "CartGory",
    components: {
        [Field.name]: Field,
        [TreeSelect.name]: TreeSelect,
        [ConfigProvider.name]: ConfigProvider,
        [List.name]:List
    },
    setup() {
        onMounted( async () => {
            document.title = '商品分类';
           let categoryId= route.query.categoryId;
           await getCategoryList();
           if(categoryId){
            let index=items.findIndex(item=>item.id==categoryId);
            hanleNav(index);
            activeIndex.value=index;
           }else{
            getGoodData();
           }
    
        })
        const route=useRoute();
        const router=useRouter();
        const store=useStore();
        const activeId = ref(0);
        const activeIndex = ref(0);
        const value = ref('');
        const contentHeight = ref();
        const value1 = ref(0);
        const value2 = ref('a');
        const dropdownMenuTitleFontSize = ref('12px');
        const treeSelectItemActiveColor = ref("rgba(249, 108, 47, 1)");

        const themeVars = reactive({
            dropdownMenuTitleFontSize,
            treeSelectItemActiveColor: treeSelectItemActiveColor.value
        });

        const items = reactive([
            {
                text: "全部",
            }
        ]);

        const goodsList = reactive([]);

        const option1 = [
            { text: '全部商品', value: 0 },
            { text: '新款商品', value: 1 },
            { text: '活动商品', value: 2 },
        ];
        const option2 = [
            { text: '默认排序', value: 'a' },
            { text: '好评排序', value: 'b' },
            { text: '销量排序', value: 'c' },
        ];

        const getCategoryList = async () => {
            let res = await getCategory({ page: 1, pageSize: 100 });
            if (res.code == 1) {
                res.data.forEach(element => {
                    items.push({ text: element.name, id: element.id })
                });
            }
        }

        const getGoodData = async () => {
            let res = await getGoodsList({ page: 1, pageSize: 100 });
            if (res.code == 1) {
                goodsList.push(...res.data);
            }
        }

        const hanleNav = async (index) => {
            goodsList.length = 0;
            if (index === 0) {
                getGoodData();
            } else {
                let res = await getGoodsList({ page: 1, pageSize: 100,categoryId:items[index].id });
                if (res.code == 1) {
                    goodsList.push(...res.data);
                }
            }
        }

        const jumpToSearch=()=>{
            router.push("/search");  
        }

        const handleJumToDetail=(id)=>{
             router.push({path:"/goods/detial",query:{id}})   
        }

        return {
            activeId,
            activeIndex,
            items,
            value,
            contentHeight,
            option1,
            option2,
            value1,
            value2,
            themeVars,
            goodsList,
            hanleNav,
            jumpToSearch,
            handleAddCarts:(goods)=>store.commit("addCartGoods",goods),
            handleJumToDetail
        }
    }
}

</script>

<template>
    <van-config-provider :theme-vars="themeVars">
        <div class="cartgory">
            <div class="search">
                <van-field  @focus="jumpToSearch"  class="search-input"  left-icon="search" placeholder="搜索商品" />
            </div>
            <div class="cartgory-list">
                <van-tree-select class="cargory-menu" v-model:main-active-index="activeIndex" :items="items"
                    @click-nav="hanleNav">
                    <template #content>
                        <div class="content" :key="index" v-for="(item, index) in goodsList" @click="handleJumToDetail(item.id)">
                            <div class="thumb-img"><van-image class="img" :src="item.img_url"></van-image></div>
                            <div class="right">
                                <p class="goods-text">{{ item.name }}</p>
                                <span class="goods-mount">已售{{ item.mount }}</span>
                                <div class="goods-price"><span>￥{{ item.price }}</span>
                                    <div class="goods-cart-icon" @click.stop.prevent="handleAddCarts(item)">
                                        <van-icon name="plus"  color="#fff"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </van-tree-select>
            </div>
        </div>
    </van-config-provider>
</template>
<style  lang="css" scoped>
.cartgory-list {
    box-sizing: border-box;
    height: calc(100vh - 51px - 33px);
}

.search {
    width: auto;
    overflow: hidden;
    background-color: #f7f8fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 9px 0;
}

.search-input {
    display: flex;
    align-items: center;
    width: 351px;
    height: 34px;
    background-color: #fff;
    border-radius: 16px;
}

.menu {
    flex: 1
}

.content {
    padding: 14px 0 0 15px;
    display: flex;
    /* flex-direction: column; */
    /* aspect-ratio: 3/4; */
    /* justify-content: flex-start; */

}

.right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 14px;
    align-items: flex-start;
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
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgba(249, 108, 47, 1);
    margin-right: 10px;
}

.thumb-img {
    width:100px;
    
}

.thumb-img .img {
    object-fit: contain;
    aspect-ratio: 4/3;
}
</style>

<style>
.cargory-menu.van-tree-select {
    height: 100% !important
}

.cargory-menu .van-sidebar-item--select {
    color: rgba(249, 108, 47, 1);
}
</style>