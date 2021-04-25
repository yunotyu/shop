<template>
  <div id="tar-bar">
    <slot></slot>
  </div>
    
</template>

<script>

export default {
}
</script>

<style scoped>
#tar-bar{
  width:100%;
  display: flex;
  position: fixed;
  bottom: 0;
  left:0;
  flex-direction: row;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100,100,100,0.1);
}
</style>