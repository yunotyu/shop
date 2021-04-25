<template>
<!-- 必须按照这种结构写，最外层一个wrapper，里面一个content，content里面可以包含多个元素 -->
<!-- 使用时，要设置wrapper的高度，会在这个高度的盒子里滚动   -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    data(){
        return{
            scroll:null,
        }
    },
    props:{
        scrollProbetype:{
            type:Number,
            default:0
        },
        pullUpload:{
            type:Boolean,
            default:false,
        }
    },
    mounted(){
        this.scroll=BScroll(this.$refs.wrapper,{
             //实时监听滚动位置 0和1不实时监听位置
            //2：手指滚动时实时监听，但不监听离开后的惯性位置
            //3:会监听离开后的惯性位置
             probeType: this.scrollProbetype,
             pullUpLoad: this.pullUpload,//上拉加载，当上拉到底部时，触发下面的事件
             observeDOM:true,//滚动不了设置这个
             click:true //点击组件里的按钮可以点击
        });
       
       //监听滚动位置,需要设置上面的probeType
        this.scroll.on('scroll', (pos)=>{
            //发送事件到父组件
            this.$emit('getScrollPos',pos);
        })
        
        if(this.pullUpload){
        //需要设置上面的pullUpLoad
           //上拉加载回调函数,滚动到最底部时执行这个函数
        //只会被回调一次，如果想回调多次，使用finishPullUp()   
          this.scroll.on('pullingUp', () => {
            this.$emit('pullUp');
        })
        }
      
    }
}
</script>

<style scoped>
   
</style>