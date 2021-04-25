<template>
    <div v-show="isShow" class="toast">
        <div>{{msg}}</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:'',
            isShow:false,
        }
    },
    methods:{
        //显示该组件的方法，第一个参数要显示的信息，第二个参数显示的时间
        show(msg,duration){
            this.isShow=true;
            this.msg=msg;
            setTimeout(() => {
                this.isShow=false;
                this.msg='';
            }, duration);
        }
    }
}
</script>

<style scoped>
.toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 99999;
    font-size: 20px;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 50px;
}
</style>