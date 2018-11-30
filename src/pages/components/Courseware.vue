<!-- Vue Created by Administrator on 2018/10/19. -->
<template>
    <div class="wrapper">
      <div class="videoGroup"></div>
      <div class="videoGroup" ref="videoGroup"></div>
      <div class="page prev"></div>
      <div class="page next"></div>
    </div>
</template>

<script>
    export default {
        name: 'Courseware',
        components: {},
        methods: {
          addVideo(dom){
            this.$refs['videoGroup'].appendChild(dom);
            dom.querySelector('video').play();
            var warpper = this.$refs['videoGroup'];

            this.mouseMove(warpper, dom, function(x, y){
              dom.style.left = x + "px";
              dom.style.top = y + "px";
            });
          },
          mouseMove(warpper, dom, callback){
            dom.onmousedown = function (event) {
              event = event || window.event;
              var that = this;
              var begin = {x: event.clientX, y: event.clientY};

              warpper.onmousemove = function (evt) {
                evt = evt || window.event;
                var after = {x: evt.clientX, y: evt.clientY};
                console.log("移动位置", after.x, after.y);
                var x = (after.x - begin.x);//移动差X
                var y = (after.y - begin.y);//移动差Y
                var bw = warpper.offsetWidth;
                var bh = warpper.offsetHeight;
//                console.log(">>>", x, y, bw, bh ,dom.offsetWidth, dom.offsetHeight);

                if(x < 0) x = 0;
                if(y < 0) y = 0;
                if(x + dom.offsetWidth > bw){
                  x = bw - dom.offsetWidth;
                }

                if(y + dom.offsetHeight > bh){
                  y = bh - dom.offsetHeight;
                }
                callback(x, y);
              };

              dom.onmouseleave(function (e) {
                window.onmousemove = null;
              });

              window.onmouseup = function () {
                //停止
                window.onmousemove = null;
                window.onmouseup = null;
              };
            };//MOVE END
          }
        }
    }
</script>

<style scoped>
  .videoGroup{
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .videoGroup .video-item{
    position: absolute;
    float: none;
  }

  .page, .page.prev {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    transition: .2s all;
    top: 46%;
    background: url(./../../assets/images/next_page.png) no-repeat center center rgba(0, 0, 0, 0.5);
  }

  .page:hover{
    background: url(./../../assets/images/next_page.png) no-repeat center center rgba(254, 131, 12, 0.6);
  }

  .page.prev{
    left: 10px;
  }

  .page.next{
    right: 10px;
    transform: rotate(180deg);
  }
</style>
