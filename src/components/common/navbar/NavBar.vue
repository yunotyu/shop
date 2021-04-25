<template>
  <div class="navbar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    props:{
       
    }
}
</script>

<style scoped>
    .navbar{
        height: 44px;
        display: flex;
        line-height: 44px;
    }
    .left,.right{
        width: 60px;
    }
    .center{
        flex: 1;
        text-align: center;
    }
   
</style>