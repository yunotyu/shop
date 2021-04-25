<template>
  <div>
       <cart-list-item  v-for="(item,index) in cartLi" :key="index" :itemInfo="item"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from '@/views/cart/childComponents/CartListItem';
import { mapGetters } from 'vuex';

export default {
    components:{
        CartListItem,
    },
    computed:{
        ...mapGetters(['cartLi'])
    }
}
</script>

<style scoped>


</style>