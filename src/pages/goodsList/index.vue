<template>
    <div class="goods-list-container">
        <router-link :to="'/home/goodsInfo/'+item.id" tag="div" class="goods-item" v-for="item in goodsList" :key="item.id">
            <img src="http://img95.699pic.com/feishe/40033/7927.jpg!/fw/808/clip/0x562a0a0/quality/80" alt="">
            <div class="title">{{item.title}}</div>
            <div class="info">
                <div class="price">
                    <span class="new">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </div>
                <div class="sell">
                    <span class="text">热卖中</span>
                    <span class="num">剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </router-link>
        <mt-button size="large" type="danger" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageindex:1,
            goodsList:[]
        }
    },
    methods:{
        getGoosList(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                // console.log(result)
                if(result.body.status === 0) {
                    this.goodsList = this.goodsList.concat(result.body.message) 
                }
            })
        },
        getMore(){
            this.pageindex++
            this.getGoosList()
        }
    },
    created(){
        this.getGoosList()
    }
}
</script>

<style lang="less">
    .goods-list-container {
        padding: 7px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item {
            //纵向布局
            flex-direction: column;                                           
            padding: 5px;
            border:1px solid #ccc;
            width: 49%;
            margin-bottom: 5px;
            img{
                width: 100%;
            }
            .title {
                font-size:14px;
                font-weight: bold;
            }
            .info {
                background-color: #eee;
                font-size: 12px;
                padding: 10px;
                .price{
                    font-weight: bold;
                    .new {
                        color: red;
                        font-size: 14px;
                        margin-right: 10px;
                    }  
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>


