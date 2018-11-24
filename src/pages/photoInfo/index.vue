<template>
    <div class="photoInfo-container">
        <div class="title">{{photoInfo.title}}</div>
        <div class="subtitle">
            <span class="ctime">发表时间：{{photoInfo.add_time | dataFormat}}</span>
            <span class="click">点击：{{photoInfo.click}}次</span>
        </div>
        <hr>
        <div class="img">
            <img class="preview-img" v-for="(item, index) in thumImages" :key="index" :src="item.src" height="100" @click="$preview.open(index, thumImages)">
        </div>
        <div class="content" v-html="photoInfo.content"></div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from '../../components/comment'
export default {
    data(){
        return{
            id:this.$route.params.id,
            photoInfo:[],
            thumImages:[
                {
                    src:"data:image/jpeg;base64,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",
                    w:600,
                    h:400
                },
                {
                    src:"data:image/jpeg;base64,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",
                    w:600,
                    h:400
                },
                {
                    src:"https://img1.doubanio.com/lpic/o468748.jpg",
                    w:600,
                    h:400
                }
            ]
        }
    },
    created(){
        this.getPhotoInfo()
        // this.getThumImages()
    },
    methods:{
        //图片详情的方法
        getPhotoInfo(){
            // console.log(this.id)
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                // console.log(result)
                this.photoInfo = result.body.message[0]
            })  
        },
        //获取图片详情中的缩略图
        getThumImages(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                // console.log(result)
                if(result.body.status === 0) {
                    this.thumImages = result.body.message
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
    .photoInfo-container {
        padding:10px;
        .title {
            font-size: 15px;
            color: rgb(65, 228, 138);
            margin-bottom: 10px;
        }
        .subtitle {
            font-size:14px;
            display: flex;
            justify-content: space-between;
            color:aqua;
        }
        .img {
            width: 100%;
            height: 80px;
            margin-bottom: 20px;
            img {
                display: inline-block;
                width: 80px;
                height: 80px;
                background-color:pink;
                margin-left: 10px;
            }
        }
        .content {
            text-indent: 2em;
            line-height: 25px;
            color: rgb(90, 172, 219);
            font-size:15px;
        }
    }
</style>


