<template>
  <div class="recommnd">
      <div class="rec-item" v-for="item in homeRecommand">
          <a :href="item.link">
              <img :src="item.image" alt=""/>
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        homeRecommand:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
    .recommnd{
        display: flex;
        flex-direction: row;
        height: 100px;
        align-items: center;
        padding-top: 30px;
        
    }
.rec-item{
    flex: 1;
    text-align: center;
}  
.rec-item img,a{
    width: 70px;
    height: 70px;
}  
.rec-item a{
    display: inline-block;
    height: 100px;
}
</style>