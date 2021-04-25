<template>
    <div class="tab-bar-item"  @click="itemClick(path)">
        <!-- 存放图片 -->
        <!-- 为了防止插槽上的属性不起效果，最后在外面都包装一层div，将属性写在上面 -->
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-active"></slot>
        </div>
        <div :style="activeStyle" :class="{activeColor:isActive}">
            <!-- 存放文字 -->
            <!-- //注意些直接写在slot元素的样式不会生效，因为会直接被传递过来的样式把整个slot替换了
            所以要在外面放个盒子，存放样式 -->
            <slot name="item-text"></slot>
        </div>
    </div>
      <!-- <div class="tab-bar-item"><img src="../../assets/img/tabbar/home.svg" alt=""><span>首页</span></div> -->
      <!-- <div class="tab-bar-item"> <img src="../../assets/img/tabbar/home.svg" alt=""><span>分类</span></div>
      <div class="tab-bar-item"> <img src="../../assets/img/tabbar/home.svg" alt=""><span>购物车</span></div>
      <div class="tab-bar-item"> <img src="../../assets/img/tabbar/home.svg" alt=""><span>我的</span></div> -->
</template>

<script>
export default {
    computed:{
        isActive(){
            //当前活跃的路由
             return this.$route.path.indexOf(this.path)!==-1;
        },
        activeStyle(){
            // isActive当前组件是否处于活跃状态
            return this.isActive?{color:this.activeColor}:{}
        }
    },
    props:{
        path:{
            type:String,
            default:'/home',
            required:true
        },
        activeColor:{
            type:String,
            default:"red",
        }
    },
    methods:{
        itemClick(path){
            this.$router.push(path);
        }
    }
}
</script>

<style>
.tab-bar-item{
  height:49px;
  flex:1;
  text-align:center;
  margin-top: 8px;
}
.tab-bar-item img{
    height:24px;
    width:24px;
    /* 去除img底部的空白 */
    vertical-align: middle;
}
.tab-bar-item span{
    display: block;
    font-size: 14px;
}
</style>