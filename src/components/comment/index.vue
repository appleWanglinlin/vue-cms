<template>
    <div class="comment-container">
        <h4>发表评论</h4>
        <hr>
        <textarea v-model="commentConent" placeholder="请输入你的评论内容，最多20字" maxlength="120"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="comment-content" v-for="(item,i) in commentList" :key="i">
            <div class="info">
                <span>第{{i+1}}楼</span>
                <span>用户：{{item.user_name}}</span>
                <span>发表时间：{{item.add_time | dataFormat}}</span>
            </div>
            <div class="content">{{item.content==="undefined" ? " 此用户特别懒":item.content}}</div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>        
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    props:["id"],
    data(){
        return{
            pageIndex:1,
            commentList:[],
            commentConent:""
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
                 console.log(result.body.message[0].content)
                if(result.body.status === 0) {
                    //concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
                    this.commentList = this.commentList.concat(result.body.message)
                }else {
                    Toast('获取评论失败')
                }
            })
        },
        getMore(){
            this.pageIndex++
            this.getComments()
        },
        postComment(){
            if(this.commentConent.trim() === "") {
                Toast('评论内容不能为空')
            }
            this.$http.post('api/postcomment/'+this.id,{content:this.commentConent.trim()}).then(result=>{
                if(result.body.status === 0) {
                    Toast(result.body.message)
                    // this.commentList.unshift(this.commentConent.trim)
                    // this.pageIndex = 1
                    // this.commentList = []
                    // this.commentConent = ""
                    // this.getComments()

                    var cmt = {
                        add_time:Date.now(),
                        content:this.commentConent.trim(),                  
                        user_name:"李真率"
                    }
                    this.commentList.unshift(cmt)
                    this.commentConent = ""
                }else {
                    Toast('提交评论失败')                    
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
            margin-bottom: 10px;
        }
        .comment-content {
            border: 2px dotted rgb(11, 241, 11);
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 10px;
            background-color: rgb(186, 216, 187);
            .info {
                width: 100%;
                height: 30px;
                line-height: 30px;
                background-color:rgb(17, 201, 207);
                margin:5px 0;
                padding: 0 5px;
                border-radius: 5px;
                display: flex;
                justify-content:space-between;
                font-size: 12px;
            }
            .content {
                margin: 10px 0;
                font-size: 12px;
                
            }
        }
    }
</style>


