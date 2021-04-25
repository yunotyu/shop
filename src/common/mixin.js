//混入
export const scollMixin = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        //回到顶部
        backTopClick() {
            let bScroll = this.$refs.bScroll || this.$refs.scroll;
            bScroll.scroll.scrollTo(0, 0, 500);
        },
    }
}