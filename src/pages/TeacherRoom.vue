<template>
  <div class="warpper">
    <room-header>

    </room-header>
    <div class="videoview">
      <remote-video @change="videoChangeHandler"></remote-video>
      <local-video></local-video>
    </div>

    <courseware class="course" ref="course">

    </courseware>

    <div class="controlBar">
      <color-picker class="color-picker"></color-picker>
      <course-page class="pagebar"></course-page>
    </div>
    <chat-view class="chat"></chat-view>
  </div>
</template>

<script>
  import RoomHeader from './components/RoomHeader.vue'
  import LocalVideo from './components/LocalVideo.vue'
  import RemoteVideo from './components/RemoteVideo.vue'
  import ChatView from './components/ChatView.vue'
  import Courseware from './components/Courseware.vue'
  import CoursePage from './components/CoursePage.vue'
  import ColorPicker from './components/ColorPicker.vue'
  export default {
    name: 'TeacherRoom',
    components: {
      RoomHeader,
      LocalVideo,
      RemoteVideo,
      ChatView,
      Courseware,
      CoursePage,
      ColorPicker
    },
    methods: {
      videoChangeHandler(dom){
        this.$refs['course'].addVideo(dom);
      }
    }
  }
</script>

<style scoped>
  .videoview {
    position: absolute;
    width: 300px;
    height: 300px;
    top: 48px;
  }

  .course {
    position: absolute;
    left: 300px;
    top: 48px;
    width: 800px;
    height: 600px;
  }

  .chat {
    top: 48px;
    bottom: 0px;
    right: 0;
    width: 265px;
    position: absolute;
  }

  .controlBar {
    position: absolute;
    left: 0;
    right: 265px;
    bottom: 0;
    height: 78px;
    background: url(./../assets/images/footer.png) no-repeat left bottom #25ace4;
  }

  .controlBar .pagebar {
    position: absolute;
    right: 15px;
    top: 18px;
  }

  .controlBar .color-picker {
    margin-top: 15px;
    margin-left: 300px;
    width: 112px;
    background: red;
  }
</style>
