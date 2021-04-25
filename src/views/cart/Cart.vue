<template>
   <div class="cart-contanier">
      <NavBar class="navbar">
         <h3 slot="center">购物车({{length}})</h3>
      </NavBar>
      <scroll :scrollProbetype="0" ref="bScroll" class="cart-scroll">
         <cart-list></cart-list>
      </scroll>
      <cart-bottom-bar class="bottom-bar"></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';
import Scroll from '@/components/common/scroll/Scroll';
import CartList from '@/views/cart/childComponents/CartList';
import CartBottomBar from '@/views/cart/childComponents/CartBottomBar';
//导入映射，可以直接使用vuex里的getters属性
import {mapGetters} from 'vuex';

export default {
   activated(){
      this.$refs.bScroll.scroll.refresh();
   },
   components:{
      NavBar,
      Scroll,
      CartList,
      CartBottomBar,
   },
    computed: {

  // 使用对象展开运算符将 getter 混入 computed 对象中
  //直接使用vuex里的getters的属性名
   //  ...mapGetters([
   //    'cartLength'
   //  ])

   //使用别名写法
   ...mapGetters({
      length:'cartLength'
   })
  }
}
</script>

<style scoped>
.navbar{
   color: #fff;
   background-color: pink;
}
.cart-scroll{
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
    overflow: hidden;
}
.cart-contanier{
    height: 100vh;
    position: relative;
}
.bottom-bar{
   position: fixed;
   left: 0;
   right: 0;
   bottom: 49px;
   background-color: #eee;
   height: 60px;
   line-height: 60px;
}
</style>