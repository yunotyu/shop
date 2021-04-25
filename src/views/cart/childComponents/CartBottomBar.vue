<template>
  <div class="bar-container">
      <div class="check-btn"><check-button @click.native="checkClick" :checked="isSelectAll"></check-button></div>
      <div class="total-price">合计：{{totalPrice}}</div>
      <div class="total-count">去结算({{totalCount}})</div>
  </div>
</template>

<script>
import CheckButton from '@/views/cart/childComponents/CheckButton';

export default {
    components:{
        CheckButton,
    },
    computed:{
        totalPrice(){
            //获取勾选的商品
            let checks= this.$store.state.cartList.filter((item)=>{
                 return item.checked;
            });
           
            let price=0;
            //求总价格
            if(checks.length>0){
                //注意：如果没有给最后一个参数，初始值为数组的第一个值，会出错，因为数组不是数字类型的
             price=checks.reduce((preVal,item)=>{
                return preVal+(item.price*1)*(item.count*1);
            },0)
            }
           return price.toFixed(2);
        },

        //统计要结算的个数
        totalCount(){
            return this.$store.state.cartList.filter((item)=>{
                 return item.checked;
            }).length;
        },
        //全选按钮是否打钩
        isSelectAll(){
            let list=this.$store.state.cartList;
            if(list.length!=0){
                let checkLen= list.filter((item)=>{
                 return item.checked;
                }).length;
                //原来数组的长度不等于打钩的数组长度时返回false
            return list.length==checkLen;
            }
            return false;
        }
    },
    methods:{
        //全选按钮
        checkClick(){
            let list=this.$store.state.cartList;
            if(list.length>0){
               let noCheckLen= list.filter((item)=>{
                    return !item.checked;
                    }).length;
                    //全部没选中
             if(noCheckLen==0){
                 list.forEach(item => {
                     item.checked=false;
                 });   
             }else{
                 list.forEach(item => {
                     item.checked=true;
                 });  
             }     
            }
            
        }
    }
}
</script>

<style scoped>
.bar-container{
    display: flex;
}
.check-btn{
    display: flex;
    align-items: center;
    height: 100%;
    line-height: 0;
    width: 50px;
    margin-left: 10px;
}
.total-price{
    flex: 1;
}
.total-count{
    width: 100px;
    text-align: center;
    background-color: orangered;
}
</style>