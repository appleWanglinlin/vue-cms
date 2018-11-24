<template>
    <div class="getdesc-container">
        <div class="title">{{desc.title}}</div>
        <hr>
        <div class="content" v-html="desc.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            desc:[]
        }
    },
    created(){
        this.getDesc()
    },
    methods:{
        getDesc(){
            this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                // console.log(result)
                if(result.body.status === 0) {
                    this.desc = result.body.message[0]
                }
            })
        }
    }
}
</script>

<style lang="less">
    .getdesc-container {
        padding: 10px;
        .title {
            color:rgb(16, 49, 235);
            font-weight: bold;
            text-align: center;
        }
        .content {
            img{
                width: 100%;
            }
        }
    }
</style>
