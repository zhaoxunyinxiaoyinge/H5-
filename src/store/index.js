
import { createStore } from 'vuex'

export const store=createStore({
        state(){
            return {
                cartGoods:[],
                checkGoods:[]
            }
        },
        mutations:{
             addCartGoods(state,playLoad){
               let index= state.cartGoods.findIndex(item=>item.id==playLoad.id);
                if(index==-1){
                    let cartgood={checked:false,name:playLoad.name,id:playLoad.id,num:1,img_url:playLoad.img_url,mount:playLoad.mount,price:playLoad.price,descrtion:playLoad.descrtion};
                    state.cartGoods.push(cartgood);
                }else{
                    state.cartGoods[index].num++;        
                }
             },

             checkedCartGoods(state,playLoad){
                state.checkGoods.push(playLoad);
             },

             handleChecked(state,checked){
                    if(checked){
                        state.cartGoods.forEach(item => {
                            item.checked=checked;
                        });
                    }else{
                        state.cartGoods.forEach(item => {
                            item.checked=checked;
                        });     
                    }
             },
             clearCartGoods(state){
                    let len=state.cartGoods.length;
                    state.cartGoods.splice(0,len);
             }
             

        },
        getters:{
            cartGoodsNum(state){
                let sum=0;
                state.cartGoods.forEach(item=>{sum+=item.num})
                return sum;
            },
            checkGoodsNum(state){
                return state.checkGoods.length;
            },
            getCheckedStatus(state){
                return state.cartGoods.every(item=>item.checked===true)&&state.cartGoods.length>0?true:false;
            },
            getTotalPrice(state){
                let sum=0;
                state.cartGoods.forEach(item=>{
                    if(item.checked){
                        sum+=(item.num)*(parseFloat(item.price))
                    }
            });
                return sum;
            }  
        },
        actions:{

        }
})