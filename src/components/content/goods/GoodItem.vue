<template>
   <div>
       <div class="item-con">
           <img  @click="detailClick" class="good-item-img" @load="imgLoad" v-lazy="imgPath" alt="">
           <div class="title"><span>{{goodItems.title}}</span></div>
           <div><span class="price">{{goodItems.price}}</span><span class="cfav">{{goodItems.cfav}}</span></div>
       </div>
   </div>
</template>

<script>
import {debounce} from '@/common/utils';

export default {
    data(){
        return{
            imgFinish:null,
        }
    },
    props:{
        goodItems:{
            type:Object,
            default:{}
        },
    },
    computed:{
        imgPath(){
            //注意这里要将this.goodItems.image放在前面，因为如果放在后面，
            //在详情页的商品列表里，是没有this.goodItems.showLarge这个属性的underfined，如果在继续.下去，会报错，
            //因为underfined不是对象，没有.运算符
            return this.goodItems.image||this.goodItems.showLarge.img ; 
        }
    },
    created(){
        //防抖函数
        this.imgFinish=debounce(()=>{
            //发生图片加载完成到事件总线
            this.$bus.$emit('imgLoadFinish');
        },200)
    },
    methods: {
        //图片加载完成事件
        imgLoad(){
           this.imgFinish();
        },
        detailClick(){
            this.$router.push('/detail/'+this.goodItems.iid)
        }
    },
}
</script>

<style>
.item-con{
    text-align: center;
    padding: 8px;
}
.title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    margin: 5px 0;
}
.price{
    margin-right: 5px;
    color: deeppink;
}
.price::after{
    content: '';
    background: url('~assets/img/common/collect.svg') no-repeat;
    background-position: center;
    background-size: 20px 20px;
    vertical-align: middle;
    display: inline-block;
    margin-bottom: 7px;
    margin-left: 4px;
    width: 20px;
    height: 20px;
}
.good-item-img{
    width: 100%;
    height: 100%;
}
</style>