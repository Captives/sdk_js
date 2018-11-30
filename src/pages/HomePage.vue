<template>
    <div>
        HomePage
        <h1>{{label}}</h1>
      <chat></chat>
    </div>
</template>
<script>
    import FormatTime from './../uuabc-sdk'
    import Chat from './chat/Chat.vue'
    export default {
        name: 'HomePage',
        components:{
          Chat
        },
        data(){
          return {
            time:1,
            label:'0:00'
          }
        },
        methods:{
          action(){
            var that = this;
            setInterval(function () {
              that.label = FormatTime.formatTimeValue(that.time++);
            },1000);
          }
        },
        mounted(){
          this.action();
        }
    }
</script>

<style scoped>

</style>
