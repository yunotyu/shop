<template>
   <Swiper>
          <SwiperItem v-for="item in swiperBanners">
            <a :href="item.link">
                <!-- 监听图片加载完成 -->
              <img :src="item.image" alt="" @load="imgLoadFinish">
            </a>
          </SwiperItem>
      </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
    components:{
        Swiper, SwiperItem
    },
    data(){
        return {
             isLoad:false,//发送图片加载完成事件
        }
    },
    props:{
        swiperBanners:{
            type:Array,
            default(){
                return []
            }
        },
       
    },
    methods: {
        //   <!-- 监听图片加载完成 -->
        //只发送一次就可以，因为计算与顶部高度只需要一次
        imgLoadFinish(){
            if(!this.isLoad){
                this.$emit('imgLoadFinish');
                this.isLoad=true;
            }
        }
    },
}
</script>

<style>

</style>