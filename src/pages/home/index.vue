<template>
    <div class="home-container">
        <!-- 轮播图 -->
        <!-- <mt-swipe class="binner-container" :auto="4000">
            <mt-swipe-item  v-for="(item,index) in bannerList" :key="index">
                <a :href="item.url">
                    <img :src="item.url">                    
                </a>
            </mt-swipe-item>
        </mt-swipe> -->
        <swiper :bannerList="bannerList" :isFull="true"></swiper>
        <!-- 六宫格 -->
         <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newList">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photoList">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodsList">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/member">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul> 
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from '../../components/swiper'
  
  export default{
      data(){
          return{
              bannerList:[]
          }
      },
      created(){
          this.getBannerData()
      },
      methods:{
          getBannerData(){
              this.$http.get('api/getlunbo').then(result=>{
                //   console.log(result.body)
                  if(result.body.status===0) {
                    this.bannerList = result.body.message
                    this.bannerList.forEach(item=>{
                        item.url = "http://www.punjabidharti.com/wp-content/uploads/2015/03/Cartoon-Love-Heart-Wallpaper.jpg"
                    })
                    // Toast('获取图片成功！')                    
                  }else {
                    Toast('获取图片失败！')
                  }
              })
          }
      },
      components:{
          swiper
      }
  }
    
</script>

<style lang="less">
    .home-container{
    // 轮播图
        // .binner-container{
        //     height: 200px;
        //     .mint-swipe-item{
        //         &:nth-child(1){
        //             background-color: pink;
        //         }
        //         &:nth-child(2){
        //             background-color: hotpink;
        //         }
        //         a {
        //             display: block;
        //             width: 100%;
        //             height: 100%;
        //             img {
        //                 width: 100%;
        //                 height: 100%;
        //             }
        //         }
        //     }
        // }
    //六宫格
        .mui-table-view {
            background-color: #fff;
            .mui-table-view-cell  {
                border: none;
                a{
                    img {
                        width: 60px;
                    }
                }
            }
        }
    }
</style>


