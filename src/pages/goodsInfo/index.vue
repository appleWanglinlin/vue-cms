<template>
    <div class="goods-info-container">
        <transition name="ball"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>            
        </transition>

        <div class="mui-card" style="background-color:#FBD5EE">
            <!-- 抽取的轮播图组件 -->
            <swiper :bannerList="ThumImages" :isFull="false"></swiper> 
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品名称</div>            
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                     <div class="price">
                        <span>市场价：<del>￥{{info.market_price}}</del></span>
                        <span>销售价：<i class="nowprice">￥{{info.sell_price}}</i></span>
                    </div>
                    <div class="number">
                        <span>购买数量：</span>
                        <!-- <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="number--">-</button>
                            <input id="test" class="mui-input-numbox" type="number" v-model="number" />
                            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="number++">+</button>
                        </div> -->
                        <numbox @getcount="getSelectedCount" :MaxNum="info.stock_quantity"></numbox>
                    </div>
                    <mt-button type="danger" size="small">立即购买</mt-button>
                    <mt-button type="primary" size="small" @click="addToShopCar">加入购物车</mt-button>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <p>商品货号：{{info.goods_no}}</p>
                   <p>库存情况：{{info.stock_quantity}}件</p>
                   <p>上架时间：{{info.add_time | dataFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <!-- 注意不能加disabled属性 -->
                <mt-button type="danger" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="primary" size="large" @click="goComment(id)">商品评论</mt-button>                
            </div>
        </div>
    </div>
</template>

<script>
import swiper from '../../components/swiper'
import numbox from '../../components/numbox'
export default {
    data(){
        return {
            id:this.$route.params.id,
            ThumImages:[],
            info:[],
            ballFlag:false,
            selectedCount:1
        }
    },
    created(){
        this.getThumImages()
        this.getInfo()
    },
    methods:{
        getThumImages(){
            // console.log(this.id)
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                // console.log(result)
                if(result.body.status === 0) {
                    this.ThumImages = result.body.message
                    this.ThumImages.forEach(item=>{
                        item.img = item.src,
                        item.url = "https://sjbz-fd.zol-img.com.cn/t_s320x510c/g5/M00/04/08/ChMkJljdsDKIIU1xAAD5NGIRcE4AAbOKgF8WA8AAPlM924.jpg"
                    })
                }
            })
        },
        getInfo(){
             this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                // console.log(result)
                if(result.body.status === 0){
                    this.info = result.body.message[0]
                }
             })
        },
        goDesc(id){
            // console.log(0);
            this.$router.push({name:"goodsDesc",params:{id}})
        },
        goComment(id){
            this.$router.push({name:"goodsComment",params:{id}})
        },
        addToShopCar(){
            this.ballFlag = !this.ballFlag
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth
            //获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();
            //小球需要偏移的位置
            const ballPositionX = badgePosition.left - ballPosition.left;
            const ballPositionY = badgePosition.top - ballPosition.top;
            el.style.transform= `translate(${ballPositionX}px,${ballPositionY}px)`;
            el.style.transition="all .6s cubic-bezier(.92,.01,.27,.86)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag   
        },
        getSelectedCount(count){
            this.selectedCount = count
            // console.log("父组件拿到的数量值为："+this.selectedCount)
        }
    },   
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="less">
    .goods-info-container {
        .ball {
            height: 15px;
            width: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            top: 363px;
            left: 151px;
            z-index: 999;
        }
        background-color: #eee;
        padding: 1px 0;
        .mui-card{
            .mui-card-content {
                color: gray;
                margin-top: 0;
                .price {
                    margin-bottom: 10px;
                    .nowprice {
                        color: red;
                        font-style: normal;
                        font-size:16px;
                        font-weight: bold;
                    }
                }
                .number {
                    margin-bottom: 10px;
                }
            }
            .mui-card-footer {
                display: block;
               .mint-button{
                    margin:10px 0;
                }
            }
         
        }
    }
</style>
