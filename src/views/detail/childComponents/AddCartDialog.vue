<template>
  <DetailDialog class="cartDia">
      <h3>选择商品信息</h3>
      <div><label for="count">数量：<input type="text" v-model="counts" name="" id="count"></label></div>
      <div>
        <label for="color">颜色：
          <select name="" id="color">
              <option value="">红色</option>
              <option value="">蓝色</option>
              <option value="">白色</option>
          </select>
        </label>
      </div>
      <div>
          <label for="size">尺寸：
           <select name="" id="color">
              <option value="">大</option>
              <option value="">中</option>
              <option value="">小</option>
          </select>
          </label>
          </div>
      <div @click="enterClick" class="calculate">确定</div>
  </DetailDialog>
</template>

<script>
import DetailDialog from '@/components/common/dialog/Dialog';

export default {
    data(){
        return{
            counts:1,
        }
    },
    components:{
        DetailDialog,
    },
    props:{
    },
    methods:{
        enterClick(){
            this.$emit('enterClick',this.counts);
            this.$bus.$emit('close');
        }
    }
}
</script>

<style scoped>
.cartDia{
    text-align: center;
}
.cartDia div{
    margin-top: 10px;
}
.cartDia .calculate{
    background-color: turquoise;
    width: 100px;
    margin: 0 auto;
    height: 30px;
    line-height: 30px;
    margin-top: 20px;
}
</style>