<!-- Vue Created by Administrator on 2018/10/18. -->
<template>
  <div class="chatView">
    <div class="chats-list scroll">
      <ul class="chats cool-chat">
        <li class="in"><h6>dalia</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">can you hear me?</span></div>
        </li>
        <li class="in"><h6>Snow</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">can you hear me? </span></div>
        </li>
        <li class="out"><h6>Anthony Burden(A)</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">I cant hear you snow</span></div>
        </li>
        <li class="out"><h6>Anthony Burden(A)</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">I cant hear dalia</span></div>
        </li>
        <li class="out"><h6>Anthony Burden(A)</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">2个字</span></div>
        </li>
        <li class="out"><h6>Anthony Burden(A)</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或</span></div>
        </li>
        <li class="out"><h6>Anthony Burden(A)</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">4</span></div>
        </li>
        <li class="out"><h6>Anthony Burden(A)</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">哈</span></div>
        </li>
        <li class="in"><h6>apple</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444</span>
          </div>
        </li>
        <li class="out"><h6>Anthony Burden(A)</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">3443</span></div>
        </li>
        <li class="out"><h6>Anthony Burden(A)</h6>
          <div class="message"><span class="arrow"></span> <span
            class="body">4444444444444444444</span></div>
        </li>
      </ul>
    </div>

    <div class="send-chat">
      <textarea id="chatText" name="chat" placeholder="Please input text" class="scroll"></textarea>
      <button id="sendBtn" class="btn-send">Send</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ChatView',
    components: {},
    methods: {}
  }
</script>

<style scoped>
  .chatView {
    background: #2b333e;
  }

  .send-chat {
    position: absolute;
    bottom: 40px;
    left: 20px;
    width: 220px;
    height: 100px;
    text-align: center;
  }

  .send-chat textarea {
    width: 190px;
    height: 80px;
    padding: 10px;
    border: none;
    resize: none;
    border-radius: 6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
  }

  .btn-send {
    display: block;
    position: relative;
    width: 110px;
    height: 35px;
    line-height: 35px;
    margin: 0 auto;
    margin-top: -20px;
    text-align: center;
    color: #fff;
    background: #39c4fb;
    border-radius: 18px;
    -webkit-border-radius: 18px;
    -moz-border-radius: 18px;
    transition: .2s background;
    cursor: pointer;
    border: none;
  }

  .btn-send:hover {
    background: #57d4fd;
  }

  .btn-send:active {
    background: #00bffe;
  }

  li h6 {
    margin-block-start: 0;
    margin-block-end: 0;
  }
</style>
