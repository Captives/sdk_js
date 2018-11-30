<template>
  <div id="app" class="fill" ref="app">
    <room class="roomPanel" v-bind:style="{zoom:ratio}" ref="wrapper"></room>
  </div>
</template>

<script>
  import Room from './pages/TeacherRoom.vue'
  export default {
    name: 'app',
    data(){
      return {ratio:1}
    },
    components: {
      Room
    },
    methods:{
      onresizeHandler(event){
        var contentWidth = this.$refs.app.offsetWidth - 20;
        var contentHeight = this.$refs.app.offsetHeight - 20;
        var minWidth = this.$refs.wrapper.$el.offsetWidth;//限制宽度
        var minHeight = this.$refs.wrapper.$el.offsetHeight;//限制高度
        var ratio = contentWidth / minWidth;
        var width = contentWidth;
        var height = minHeight * ratio;
        if (height > contentHeight) {
          ratio = contentHeight / minHeight;
          height = contentHeight;
          width = minWidth * ratio;
        }

        this.ratio = ratio;
      }
    },
    mounted(){
      this.onresizeHandler();
      window.onresize = this.onresizeHandler;
    }
  }
</script>
<style>
  .roomPanel {
    width: 1366px;
    height: 726px;
    left: 50%;
    top: 50%;
    margin-left: -683px;
    margin-top: -363px;
    background: #FFF;
    position: relative;
  }
</style>
