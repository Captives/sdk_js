<!-- Vue Created by Administrator on 2018/10/18. -->
<template>
  <div class="video">
    <div class="video-item" v-for="(item, index) in list" :ref="item.label" :key="index">
      <div class="display">
        <video src="./../../assets/video1P1.mp4" autoplay loop>浏览器不支持video</video>
      </div>
      <button @click="clickHandler(item)">{{item.stage?'下台':'上台'}} {{index + 1}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RemoteVideo',
    data(){
      return {
        stage: false,
        list: [
          {label: 'vi01', stage: false},
          {label: 'vi02', stage: false},
          {label: 'vi03', stage: false},
          {label: 'vi04', stage: false}]
      }
    },
    components: {},
    methods: {
      clickHandler(item){
        var target = this.$refs[item.label][0];
        if(item.stage){
          target.prepend(item.dom);
          item.dom.querySelector('video').play();
        }else{
          item.dom = target.querySelector('.display');
          this.$emit('change', item.dom);
        }
        item.stage = !item.stage;
      }
    }
  }
</script>

<style scoped>
  .video {
    width: 300px;
    height: 300px;
    background: #eee;
  }
</style>
