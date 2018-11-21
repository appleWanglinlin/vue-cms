<template>
    <div class="news-list-container">
        <ul class="mui-table-view">
            <li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
                <router-link :to="'/home/newList/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" src="../../images/menu1.png">
                    <!-- <img class="mui-media-object mui-pull-left" :src="item.img_url"> -->
                    
                    <div class="mui-media-body">
                        <p class="tltle mui-ellipsis">{{item.title}}</p>
                        <!-- 省略号的样式 -->
                        <p class="sign">
                            <span class="ctime">
                                发表时间：
                                {{item.add_time | dataFormat}}
                            </span>
                            <span class="click">点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
    
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        created(){
            this.getNewsList()
        },
        data(){
            return{
                newsList:[]
            }
        },
        methods:{
            getNewsList(){
                this.$http.get('api/getnewslist').then(result=>{
                    // console.log(result)
                    if(result.body.status===0) {
                        this.newsList = result.body.message
                    }else {
                        Toast('获取图文资讯失败')
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .news-list-container{
        .mui-table-view {
            .mui-media-body {
                .tltle {
                    font-weight:bold;
                    color: #000;
                    font-size: 15px;
                }
                .sign {
                    color: rgb(22, 159, 201);
                }
            }
        }
    }
</style>


