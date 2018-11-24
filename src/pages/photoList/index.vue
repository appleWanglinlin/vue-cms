<template>
    <div class="photoList-container">
        <!-- 上面滑动标题部分 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a @click="getImages(item.id)" :class="{'mui-control-item' : true,'mui-active': item.id==0}" v-for="item in categories" :key="item.id">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!-- 懒加载 -->
        <ul class="photo-list">
            <router-link :to="'/home/photoInfo/'+item.id" v-for="item in images" :key="item.id" tag="li">
                <!-- <img :src="item.img_url" alt=""> -->
                <img v-lazy="item.url">
                <div class="info">
                    <div class="info-title">{{item.title}}</div>
                    <div class="info-content">{{item.zhaiyao}}</div>  
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
    data(){
        return {
            categories:[],
            images:[],
            img:[
                {url:"https://img1.doubanio.com/lpic/o468748.jpg"}
            ]
        }
    },
    created(){
        this.getAllCategory()
        this.getImages(0)
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        })
    },
    methods:{//注意methods是一个对象
       getAllCategory(){
            this.$http.get('api/getimgcategory').then(result=>{
                // console.log(result)
                if(result.body.status === 0) {
                    this.categories = result.body.message
                    this.categories.unshift({
                        "id":0,
                        "title":"全部"
                    })
                }
            })
       },
       getImages(id){
            this.$http.get('api/getimages/'+id).then(result=>{
                console.log(result)
                if(result.body.status === 0) {
                    this.images = result.body.message
                    for(var i = 0;i<images.length;i++) {
                        images[i].url = this.img.url
                    }
                }
            })
       }
    }
}
</script>

<style lang="less">
    .photoList-container {
        .photo-list {
            list-style: none;
            padding: 10px;
            padding-top: 0;
            li {
                border: 1px solid #000;
                margin-bottom: 10px;
                position: relative;
                 img[lazy=loading] {
                    width: 100%;
                    height: 300px;
                    margin: auto;
                    background-color: red;
                    // display: block;
                    vertical-align: middle;
                }
                img {
                    width: 100%;
                    height: 300px;
                    background-color: rgb(245, 185, 195);
                }
            }
            .info {
                position: absolute;
                bottom: 0;
                padding:10px;
                background-color:rgba(134, 120, 120, 0.2);
                .info-title {
                    font-size: 14px;
                    font-weight: bold;
                }
                .info-content{
                    font-size: 13px;
                }
            }
        }        
    }
</style>


