<script>
import { AddressList, Popup, AddressEdit,Toast } from 'vant';
import { useRouter } from "vue-router";
import {ref} from "vue";
import {addAddress,getAddress} from "./api/index";
import { onMounted } from 'vue';

export default {
    name: "AddRess",
    components: {
        [AddressList.name]: AddressList,
        [Popup.name]: Popup,
        [AddressEdit.name]: AddressEdit,
    },
    setup() {
        const chosenAddressId = ref("1");
        const show = ref(false);
        const areaList = ref({
            province_list: {
                110000: '河北省',
                120000: '湖北省',
            },
            city_list: {
                110100: '北京市',
                120100: '荆州市',
            },
            county_list: {
                110101: '东城区',
                110102: '西城区',
                120101:'监利县',
                120202:'尺八县'
            },
        });
        const router = useRouter();
        const list=ref([]);


        onMounted(()=>{
            getAddressList();
        })

        const onAdd = () => {
            show.value = true;
        };
        const onEdit = (val) => {
            console.log(val, "val")
            show.value = true;
        };

        const onClickLeft = () => {
            router.back();
        }

        const getAddressList=async()=>{
           let res= await getAddress();
           if(res.code==1){
                res.data.forEach(area => {
                    list.value.push({tel:area.phone,id:area.id,name:area.consignee,address:area.province_name+''+area.city_name+''+area.district_name+''+area.detail,isDefault:area.is_default==1?true:false})   
                });
                console.log(list.value);
           }
        }

        const onSave=(value)=>{
            const addressInfo={
                    consignee:value.name,
                    phone:value.tel,
                    province_name:value.province,
                    city_name:value.city,
                    district_name:value.county,
                    detail:value.addressDetail,
                    is_default:value.isDefault?1:0,
                    postal_code:value.postalCode
            }
            postAddress(addressInfo);

        }

        const postAddress=async(addressInfo)=>{
              let res= await  addAddress(addressInfo);
              console.log(res.code,555)
              if(res.code==1){
                Toast.success("地址添加成功");
              }else{
                Toast.fail("地址添加失败");
              }
              show.value=false;

        
        }

        const validPhone=(value)=>{
                console.log(value);
        }

        return {
            show,
            areaList,
            list,
            chosenAddressId,
            onClickLeft,
            validPhone,

            onAdd,
            onEdit,
            onSave
        }
    }
}
</script>
<template>
    <div>
        <van-address-list v-model="chosenAddressId" :list="list" 
            default-tag-text="默认" @add="onAdd" @edit="onEdit" />
        <van-popup v-model:show="show">
            <van-address-edit :area-list="areaList" show-postal show-set-default show-search-result
                :style="{ width: '300px', height: '30%' }" teleport="body" :search-result="searchResult"
                :tel-validator="validPhone"
                :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @change-detail="onChangeDetail" />
        </van-popup>
    </div>
</template>