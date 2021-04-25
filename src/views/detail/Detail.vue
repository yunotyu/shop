<template>
  <div class="detail">
   <DetailNavBar ref="navBar" @barClick="detailBarClick" class="nav-bar"></DetailNavBar>
   <AddCartDialog @enterClick='detailEnterClick'></AddCartDialog>
   <Scroll @getScrollPos="scrollingPos" :scrollProbetype="3" ref="bScroll" class="scroll-wrapper">
         <DetailSwiper :swiperImgs="images"></DetailSwiper>
         <DetailBaseInfo :goods="goodBaseInfo"></DetailBaseInfo>
         <DetailShopInfo :shop="goodShopInfo"></DetailShopInfo>
         <DetailGoodInfo @imgLoadFinish="loadFinish" :detailInfo="goodInfo"></DetailGoodInfo>
         <DetailParams ref="param" :paramInfo="goodParamInfo"></DetailParams>
         <DetailComment ref="comment" :commentInfo="goodCommentInfo"></DetailComment>
         <goods ref="suggest" :goodList="reommandsList"></goods>
   </Scroll>
   <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
   <back-top v-show="isShowBackTop" @click.native="backTopClick"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar';
import {getDetailDatas,GoodBaseInfo,ShopInfo,GoodsParam,getRecommand} from 'network/detail';
import DetailSwiper from './childComponents/DetailSwiper';
import DetailBaseInfo from './childComponents/DetailBaseInfo';
import DetailShopInfo from './childComponents/DetailShopInfo';
import Scroll from 'components/common/scroll/Scroll.vue';
import DetailGoodInfo from './childComponents/DetailGoodInfo';
import DetailParams from './childComponents/DetailParams';
import DetailComment from './childComponents/DetailComment';
import {debounce} from '@/common/utils';
import Goods from '@/components/content/goods/Goods.vue';
import DetailBottomBar from './childComponents/DetailBottomBar.vue';
import {scollMixin} from '@/common/mixin';
import BackTop from '@/components/content/backTop/BackTop.vue';
import AddCartDialog from '@/views/detail/childComponents/AddCartDialog';

export default {
    name:"Detail",
    
    mixins:[scollMixin],////使用混入导入返回顶部的函数的属性

    data(){
        return {
            goodId:null,
            datas:null,
            images:[],
            goodBaseInfo:{},
            goodShopInfo:{},
            goodInfo:{},
            goodParamInfo:{},
            goodCommentInfo:{},
            reommandsList:[],
            finish:null,
            offesetTopYs:[],//每个模块距离顶部的距离
            debounceGetTop:null,//使用防抖在获取offesetTop函数里，防止多次触发
            
        }
    },

    created(){
        //获取商品id
      this.goodId=this.$route.params.id;
      //加载详情页全部数据
      this.getDetailDatas(this.goodId);

      //加载推荐页数据
      getRecommand().then(results=>{
        this.reommandsList=results.data.data.list;
      });

      this.debounceGetTop=debounce(()=>{
           //获取各组件的距离顶部的值，这里要放在图片加载完成后出发的事件里
        this.offesetTopYs=[];
        this.offesetTopYs.push(0);
        this.offesetTopYs.push(this.$refs.param.$el.offsetTop);
        this.offesetTopYs.push(this.$refs.comment.$el.offsetTop);
        this.offesetTopYs.push(this.$refs.suggest.$el.offsetTop);
      },400)
    },

    mounted(){
       this.finish=  debounce(()=>{
          this.$refs.bScroll.scroll.refresh()
        },200);
      //监听图片加载完成信号，在每0.2s内执行一次刷新，不管这0.2完成多少图片的加载
      this.$bus.$on('imgLoadFinish',this.finish);
    },

    destroyed(){
        //离开详情页取消图片加载完成信号
      this.$bus.$off('imgLoadFinish',this.finish);
    },

    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodInfo,
        DetailParams,
        DetailComment,
        Goods,
        DetailBottomBar,
        BackTop,
        AddCartDialog,
    },
    methods:{
    //加载详情页全部数据
      getDetailDatas(id){
          getDetailDatas(id).then(results=>{
              this.datas=results.data.result;
              this.images=this.datas.itemInfo.topImages;
              //将商品信息保存到本地
              this.goodBaseInfo=new GoodBaseInfo(this.datas.itemInfo,this.datas.columns,this.datas.shopInfo.services);
            //   保存商店信息
              this.goodShopInfo=new ShopInfo(this.datas.shopInfo);
              //保存详细商品信息
              this.goodInfo=this.datas.detailInfo;
                // 获取参数的信息
              this.goodParamInfo = new GoodsParam(this.datas.itemParams.info, this.datas.itemParams.rule)
             //商品评论信息
              if (this.datas.rate.list){
                this.goodCommentInfo=this.datas.rate.list[0];
              }
          })
      },
        //商品详细信息图片加载完成，刷新better-scroll的可滚动高度
    loadFinish(){
        this.$refs.bScroll.scroll.refresh()
        //获取各组件的top
        this.debounceGetTop();
    },

    //导航栏点击事件
    detailBarClick(index){
      //点击后滚动到对应模块
      this.$refs.bScroll.scroll.scrollTo(0,-this.offesetTopYs[index],1);
    },

    //滚动位置,在导航栏显示对应的选项
    scrollingPos(pos){
      let length=this.offesetTopYs.length;
      let navBar=this.$refs.navBar;
      let posY=-pos.y;

      //显示返回顶部按钮
      if(posY>2000){
        this.isShowBackTop=true;
      }
      else{
        this.isShowBackTop=false;
      }
      //滚动到对应位置,在导航栏显示对应的选项
      for(let i=0;i<length;i++){
        if(i<=length-2){
            if(posY>= this.offesetTopYs[i]&&posY< this.offesetTopYs[i+1]){
                navBar.curIndex=i;
            }
         }
       if(posY>=this.offesetTopYs[length-1]){
            navBar.curIndex=length-1;
          }
    }
    },

    //添加到购物车
    addToCart(){
        this.$bus.$emit('addToCart');
    },

    //添加商品到购物车,在弹窗点击确定后，将数据保存到vuex
    detailEnterClick(count){
      let product={};
        product.iid = this.goodId
        product.imgURL = this.datas.itemInfo.topImages[0]
        product.title = this.datas.itemInfo.title
        product.desc = this.datas.itemInfo.desc
        product.price = this.datas.itemInfo.lowPrice
        product.count=count;

        //调用vuex里的actions里的函数，返回一个promise，方便处理后续
        this.$store.dispatch('addProToCart',product).then(res=>{
          this.$toast.show('添加商品成功',1000)});
    }
},
}
</script>

<style scoped>
.detail{
    position: relative;
    z-index: 9999;
    background-color: #fff;
    height: 100vh;
}
.scroll-wrapper{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 58px;
    background-color: #fff;
    overflow: hidden;
}
.nav-bar{
    position: relative;
    z-index: 99;
    background-color: #fff;
}
</style>