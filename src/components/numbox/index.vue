<template>
    <div class="numbox-container">
        <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='MaxNum'>
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="number--">-</button>
            <input id="test" class="mui-input-numbox" type="number" v-model="number" @change="numChanged"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="number++">+</button>
        </div>
    </div>
</template>

<script>
export default {
    props:["MaxNum"],
    data(){
        return{
            number:1
        }
    },
    created(){
        console.log(this.MaxNum)   
    },
    methods:{
        numChanged(){
            this.$emit('getcount',this.number)
        }
    }
}
</script>

<style lang="less">

</style>




