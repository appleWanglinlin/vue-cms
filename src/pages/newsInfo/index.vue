<template>
    <div class="news-info-containe">
        <div class="title">
            {{newsInfo.title}}
        </div>
        <div class="subtitle">
            <span>发表时间： {{newsInfo.add_time | dataFormat}}</span>
            <span>点击： {{newsInfo.click}}次</span>
        </div>
        <hr>
        <div class="content" v-html="newsInfo.content">
        </div>
        <!-- 注意组件放的位置 -->   
        <!-- <comment :id="newsInfo.id"></comment> -->
        <!-- 注意父组件向子组件传值时，绑定的属性对应的值应为父组件data中的值 -->
        <comment :id="id"></comment>        
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
import comment from '../../components/comment/';//评论模块组件

export default {
    data(){
        return{
            id:this.$route.params.id,
            newsInfo:[]
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                // console.log(result)
                if(result.body.status === 0) {
                    this.newsInfo = result.body.message[0]
                }else {
                    Toast('获取图文信息失败')
                }
            })
        }
        
    },
    components:{
        comment
    }
}
</script>

<style lang="less">
    .news-info-containe {
        .title {
            color: rgb(240, 199, 15);
            margin: 10px 0;
            font-size: 16px;
            text-align: center;
            font-weight: bold;
            padding: 0 5px;            
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            padding: 0 5px;
            margin-bottom: 10px;
            color: rgb(216, 25, 216);
            font-size: 14px;
        }
        .content {
            padding: 0 5px;     
            img{
                width: 100%;
            }
        }
    }
</style>


