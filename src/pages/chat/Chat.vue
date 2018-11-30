<template>
  <div class="chat">
    Chat
  </div>
</template>

<script>
  import RemoteClient from './../../js/RemoteClient'
  import VideoClient from './../../js/VideoClient'
  export default {
    name: 'Chat',
    methods: {
      init(){
        var client = new RemoteClient();
        var videoClient = new VideoClient();
        client.connect('wss://local.uuabc.com:1443', '/monit', '100');
        client.on('open', function (data) {

        });
      }
    },
    mounted(){
      this.init();
    }
  }
</script>

<style scoped>
  .chat {
    height: 200px;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
</style>
