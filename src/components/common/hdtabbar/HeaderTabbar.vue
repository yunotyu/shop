<template>
  <div class="header-tabbar">
      <div v-for="(item,index) in titles" >
        <span  @click="selected(index)" :class="{active:currentIndex==index}">{{item}}</span>
      </div>
      
  </div>
</template>

<script>
export default {
    props:{
        titles:{
            type:Array,
            default(){
              return [];
            }
        }
    },
    data(){
     return {
        currentIndex:0,
     }
    },
    methods: {
      selected(index){
        this.currentIndex=index;
        //点击哪个选项卡，将索引传递到父组件,请求对应数据
        this.$emit('tabClick',index);
      }
    },
}
</script>

<style scoped>
.header-tabbar{
  display: flex;
  align-items: center;
  height: 44px;
}
.header-tabbar div{
  flex: 1;
  text-align: center;
}
.header-tabbar div span{
  padding: 4px 4px;
}
.active{
  color: deeppink;
  border-bottom:3px solid deeppink ;
}
</style>