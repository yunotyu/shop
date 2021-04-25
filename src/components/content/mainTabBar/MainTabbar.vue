<template>
   <Tarbar>
      <TabItem :path="home">
         <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
         <img slot="item-active" src="~assets/img/tabbar/home_active.svg" alt="">
         <span slot="item-text">首页</span>
      </TabItem>
      <TabItem :path="category">
         <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
         <img slot="item-active" src="~assets/img/tabbar/category_active.svg" alt="">
         <span slot="item-text">分类</span>
      </TabItem>
      <TabItem :path="cart">
         <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
         <img slot="item-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
         <span slot="item-text">购物车</span>
      </TabItem>
      <TabItem :path="profile">
         <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
         <img slot="item-active" src="~assets/img/tabbar/profile_active.svg" alt="">
         <span slot="item-text">我的</span>
      </TabItem>
    </Tarbar>
</template>

<script>
import Tarbar from 'components/common/tarbar/TarBar';
import TabItem from 'components/common/tarbar/TarBarItem';

export default {
    components:{
        Tarbar,
        TabItem,
    },
     data(){
    return{
    home:'/home',
    cart:'/cart',
    category:'/category',
    profile:'/profile'
  }
  }
}
</script>

<style scoped>

</style>