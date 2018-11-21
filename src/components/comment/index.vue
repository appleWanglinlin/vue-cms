<template>
    <div class="comment-container">
        <h4>发表评论</h4>
        <hr>
        <textarea placeholder="请输入你的评论内容，最多20字" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="comment-content" v-for="(item,i) in commentList" :key="i">
            <div class="info">
                <span>第{{i+1}}楼</span>
                <span>用户：{{item.user_name}}</span>
                <span>发表时间：{{item.add_time | dataFormat}}</span>
            </div>
            <div class="content">
                {{item.content==="undefined"?"此用户很懒":item.content}}
            </div>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    props:["id"],
    data(){
        return{
            pageIndex:1,
            commentList:[]
        }
    },
    created(){
        this. getComments()
    },
    methods:{
        getComments(){
        // console.log(this.id)
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                // console.log(result)
                if(result.body.status === 0) {
                    this.commentList = result.body.message
                }else {
                    Toast('获取评论失败')
                }
            })
        }
    }
}
</script>

<style lang="less">
    .comment-container {
        padding: 0 5px;
        textarea {
            font-size: 14px;
            height: 85px;
            border-radius: 5px;
            margin-bottom: 0;
        }
        .mint-button {
            font-size: 20px;
        }
        .comment-content {
            .info {
                width: 100%;
                height: 30px;
                line-height: 30px;
                background-color:rgb(98, 120, 194);
                margin:5px 0;
                padding: 0 5px;
                border-radius: 5px;
                display: flex;
                justify-content:space-between;
                font-size: 14px;
            }
            .content {
                margin: 10px 0;
                font-size: 12px;
                
            }
        }
    }
</style>


