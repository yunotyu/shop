<template>
  <div>
    <NavBar>
        <div class="bar-left" slot="left">
            <img @click="backHome" src="~assets/img/common/back.svg" alt="">
        </div>
        <div class="bar-center" slot="center">
            <span @click="barClick(index)" :class="{active:curIndex==index}" v-for="(item,index) in titles">{{item}}</span>
      </div>
    </NavBar>
     
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

export default {
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            curIndex:0,
        }
    },
    components:{
        NavBar,
    },
    methods: {
        backHome(){
            this.$router.go(-1);
        },
        barClick(index){
            this.curIndex=index;
            //发送点击事件到父组件
            this.$emit('barClick',index);
        }
    },
}
</script>

<style scoped>
.bar-center{
    display: flex;
}
.bar-center span{
    flex: 1;
}
.bar-left{
    margin-left: 20px;
    margin-top: 5px;
}
.active{
    color: deeppink;
}
</style>