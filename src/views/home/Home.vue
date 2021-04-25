<template>
  <div class="home">
    <!-- 解决在使用better-scroll出现的导航栏无法吸顶问题
    解决方法：把该导航栏复制一份放在better-scroll的wrapper外面。然
    后滚动到一定位置，显示在wrapper外面的导航栏，隐藏里面的导航栏。 -->
    <NavBar class="navbar-bgc"><h3 slot="center">购物街</h3></NavBar>
    <HeaderTabbar v-show="isHdTabbarFixed" class="outHdTabbar hd-bar" ref="hdTabBar1" @tabClick="homeTabClick"  :titles="['流行','新款','精选']"></HeaderTabbar>
   <Scroll @getScrollPos="homeGetScrollPos" @pullUp="homePullUp" :scrollProbetype="3" :pullUpload="true" ref="scroll" class="home-wrapper">
      <HomeSwiper @imgLoadFinish="homeSwiperImgLoadFinish" class="swiper-padding" :swiperBanners="banners"></HomeSwiper>
      <HomeRecommand :homeRecommand="recommends"></HomeRecommand>
      <HomeFeature class="feature"></HomeFeature>
      <HeaderTabbar  v-show="!isHdTabbarFixed"  ref="hdTabBar2" @tabClick="homeTabClick" class="hd-bar" :titles="['流行','新款','精选']"></HeaderTabbar>
      <Goods :goodList="showGoodData"></Goods>
   </Scroll>
  <BackTop v-show="isShowBackTop" @click.native="backTopClick"></BackTop>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata,getProducts} from 'network/home'
import HomeSwiper from './childComponents/HomeSwiper';
import HomeRecommand from './childComponents/HomeRecommand';
import HomeFeature from './childComponents/HomeFeature';
import HeaderTabbar from 'components/common/hdtabbar/HeaderTabbar';
import Goods from 'components/content/goods/Goods';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop';
import {debounce} from 'common/utils';//防抖动函数导入
import {scollMixin} from '@/common/mixin';

export default {
  
  mixins:[scollMixin],//使用混入导入返回顶部的函数的属性

  data(){
    return{
      banners:null,
      recommends:null,
      //存放商品列表
      goods:{
        pop:{page:1,list:[]},
        new:{page:1,list:[]},
        sell:{page:1,list:[]},
      },
      //当前点击选项卡
      currentTabIndex:0,
      curType:'pop',
      // isShowBackTop:false,
      //获取导航栏里顶部的距离
      hdTabBarOffsetTop:0,
      isHdTabbarFixed:false,
      saveY:0,
      homeMaxScrollY:0,
      homeImgLoadFinish:null,
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommand,
    HomeFeature,
    HeaderTabbar,
    Goods,
    Scroll,
    BackTop,
  },
  created(){
    this.getHomeMultidata();
    //组件创建完成，先请求3部分第一页的数据存储
    this.getProducts('pop',1);
    this.getProducts('new',1);
    this.getProducts('sell',1);
    
   
  },
  mounted(){
    //防抖动
      //刷新better-scroll的可滚动高度，解决下拉加载时无法下拉的问题
    //注意，因为这里是在父组件created声明周期，可能存放better-scroll的子组件还没有加载完成，而图片已经加载完成，
       //会触发这个事件，所以会报better-scroll子组件为undefined的错误。
      // this.$refs.scroll&&this.$refs.scroll&&this.$refs.scroll.scroll.refresh();
      //调用上面返回的函数变量
        const homeRefresh=()=>{
          this.$refs.scroll&&this.$refs.scroll&&this.$refs.scroll.scroll.refresh();
          }

        this.homeImgLoadFinish=()=>{
          homeRefresh();
        };

        //监听事件总线里的图片加载完成事件,结合better-scorll解决问题
        this.$bus.$on('imgLoadFinish',this.homeImgLoadFinish);
 },


  methods: {
    // 将created()里的axios封装到这里

    //获取第一个导航栏和轮播图数据
    getHomeMultidata(){
      getHomeMultidata().then((result) => {
        this.banners=result.data.data.banner.list;
        this.recommends=result.data.data.recommend.list;
      
    }).catch((err) => {
      console.log(err);
    });
    },

    getProducts(type,page){
      getProducts(type,page).then(results=>{
        //将获得的商品数据添加进上面的商品数组
        this.goods[type].list.push(...results.data.data.list);
        //再将页面+1
        this.goods[type].page=page;
      }).catch(err=>{console.log(err);});
    },

  //子组件传递过来的选项卡切换事件
    homeTabClick(index){  
      this.$refs.hdTabBar1.currentIndex=index;
      this.$refs.hdTabBar2.currentIndex=index;
      this.currentTabIndex=index;
        switch(this.currentTabIndex){
        case 0:
          //  this.getProducts('pop',this.goods['pop'].page)
           this.curType='pop';
           break;
        case 1:
          // this.getProducts('new',this.goods['new'].page)
           this.curType='new';
           break;
        case 2:
          //  this.getProducts('sell',this.goods['sell'].page)
           this.curType='sell';
           break;
      }
    },

    // //回到顶部
    // backTopClick(){
    //   this.$refs.scroll.scroll.scrollTo(0,0,500);
    // },

  //监听页面的better-scroll滚动位置
    homeGetScrollPos(pos){
      //显示返回顶部按钮
      this.isShowBackTop=pos.y<-1000;
      //将导航栏固定在一定位置
      this.isHdTabbarFixed=pos.y<-this.hdTabBarOffsetTop;
    },

    //上拉加载数据
    homePullUp(){
      let page=this.goods[this.curType].page+1;
      this.getProducts(this.curType,page);
      //能多次上拉加载
      this.$refs.scroll.scroll.finishPullUp()
     
    },
    // 轮播图图片加载完成
    homeSwiperImgLoadFinish(){
      //获取导航栏里顶部的距离，让导航栏有吸顶效果，如果在图片没有加载完成去获取，可能上面的元素的高度因为没有图片比较低，
      //造成不准确,这里获取的时better-scroll里面的导航栏
        this.hdTabBarOffsetTop=this.$refs.hdTabBar2.$el.offsetTop;
    },
  },


  computed:{
    //保存请求过来的数据
    showGoodData(){
      return this.goods[this.curType].list
    }
  },

  //组件被激活时，重新滚动到上次滚动位置
  activated() {
    //记得最后一个参数的时间设置为1，否则可能会出现一直跳到顶部
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,1);
      //最好加个刷新，防止出现问题
      this.$refs.scroll.scroll.refresh();
    },
    
  //离开该组件时，记录当前滚动的位置
  deactivated() {
    //在离开home页面时取消home组件监听图片加载完成事件,
    //注意第二个参数要加执行的函数名，不然会取消全局的所有监听这个事件的
      this.$bus.$off("imgLoadFinish",this.homeImgLoadFinish);
      this.saveY=this.$refs.scroll.scroll.y;
    },
}
</script>

<style scoped>
.home{
    /* vh是视口高度单位 */
  height: 100vh;
  position: relative;
}
  .navbar-bgc{
    background-color: pink;
    color: #fff;
    /* position: fixed;
    left: 0;
    top:0;
    right: 0;*/
    /* z-index:9999;  */
  }
  .swiper-padding{
    /* padding-top: 40px; */
  }
  .hd-bar{
    /* 粘性定位，当超过这个组件的高度44px，定位在最顶部 */
    /* position: sticky;
    top: 44px; */
    z-index: 99;
    background-color: #333;
  }
  .feature{
    padding-top: 20px;
  }
  /* 滚动盒子的样式 */
  .home-wrapper{
    overflow: hidden;
    position: absolute;
    /* 子绝父相，让子盒子距离上下导航栏一定高度，其他部分正常显示 */
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .hdTabbarFixed{
    position: fixed;
    left: 0;
    top: 44px;
    right: 0;
  } */

  .outHdTabbar{
    /* 要使用相对定位，占有位置 */
    position: relative;
    z-index: 9;
  }
</style>