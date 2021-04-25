<template>
<div v-show="iFshow"   class="diaContainer">
 <div class="dialog">
          <slot></slot>
          <span @click="close" class="close">X</span>
  </div>
</div>
 
</template>

<script>
export default {
    data(){
       return{
            iFshow:false,
       }
    },
    methods:{
        close(){
            this.iFshow=false;
        }
    },
    created(){
        this.$bus.$on('addToCart',()=>{
            this.iFshow=true;
        });
         this.$bus.$on('close',()=>{
            this.iFshow=false;
        });
    }
}
</script>

<style scoped>
.diaContainer{
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: transparent;
    display: block;
    position: fixed;
}
.dialog{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #eee;
    height: 200px;
    width: 300px;
    border-radius: 8px;
    
}
.close{
    display: block;
    text-align: center;
    position: absolute;
    right: -10px;
    top: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(238, 238, 238);
}

</style>