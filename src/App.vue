<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <MainTabbar class="main-bar"></MainTabbar>
  </div>
</template>

<script>
import MainTabbar from 'components/content/mainTabBar/MainTabbar'
import store from '@/store/index';

export default({
  components:{
    MainTabbar,
  },
  store,
})
</script>

<style scoped lang="less">
//引入css文件
@import 'assets/css/base.css';
.main-bar{
  z-index: 1111;
}
</style>
