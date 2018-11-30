<template>
    <div class="header-bar">
      <div class="logo"></div>
      <div class="content">

      </div>
      <div class="btn-group">
        <button class="setup"><i></i></button>
        <button class="refresh"><i></i></button>
        <button class="exit"><i></i></button>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'RoomHeader',
        components: {},
        methods: {}
    }
</script>

<style scoped>
  .header-bar{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 48px;
    display: flex;
    background: url(./../../assets/images/header.png) no-repeat left top #1da9e6;
  }

  .content{
    flex: 1;
    text-align: right;
  }

  .btn-group button{
    width: 48px;
    height: 48px;
    background: none;
    border: none;
    transition: .2s all;
  }

  .btn-group button:hover{
    background: #45b9eb;
  }

  .btn-group button.exit:hover{
    background: #f53530;
  }

  .btn-group button i{
    width: 24px;
    height: 24px;
    margin: 0 auto;
    display: block;
  }

  .btn-group button.setup i{
    background: url(./../../assets/images/toolicon.png) no-repeat 0px -34px;
  }
  .btn-group button.refresh i{
    background: url(./../../assets/images/toolicon.png) no-repeat -49px -34px;
  }
  .btn-group button.exit i{
    background: url(./../../assets/images/toolicon.png) no-repeat -96px -35px;
  }
</style>
