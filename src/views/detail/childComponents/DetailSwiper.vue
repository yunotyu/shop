<template>
<div class="detail-swiper">
      <SwiperItem class="detail-swiper">
          <SwiperItem class="detail-swiper" v-for="(item,index) in swiperImgs" :key="index">
              <img :src="item" alt="">
          </SwiperItem>
      </SwiperItem>
</div>
    
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        swiperImgs:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
/* .detail-swiper-item{
    height: 300px;
}
.detail-swiper-item img{
    height: 300px;
} */
</style>