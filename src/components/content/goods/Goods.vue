<template>
    <div class="goods">
        <div class="good-item-container" v-for="item in goodList">
            <good-item :goodItems="item" class="good-item" ></good-item>
        </div>
    </div>
</template>

<script>
import GoodItem from './GoodItem.vue';
export default {
    components:{
        GoodItem,
    },
    props:{
        goodList:{
            type:Array,
            default(){
                return[]
            }
        }
    }
}
</script>

<style scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.goods .good-item-container{
    width: 48%;
}
</style>