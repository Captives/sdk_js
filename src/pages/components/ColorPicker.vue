<!-- Vue Created by Administrator on 2018/10/22. -->
<template>
  <div class="picket">
    <ul>
      <li v-for="(item, index) in list" :key="index"><i></i></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ColorPicker',
    data(){
      return {selectValue: '#ff3b2f', list: ['#ff3b2f', '#f7d158', '#1b8bfe', '#2dc21b', '#ff8000', '#7c76f7']}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .picket
    background: yellow;
    ul
      margin: 0;
      display: block;
      width: 100%;
      height: 100%;
      padding: 0px;
      li
        margin: 0;
        padding: 0;
        list-style: none;
        cursor: pointer;
        float: left;
        width: 18px;
        height: 18px;
        background: #ff3b2f;
        border-radius: 50%;
        margin-right: 15px;
        margin-bottom: 5px;
        text-align: center;
        border: 2px solid rgba(255, 255, 255, .3);
        i
          width: 14px;
          height: 10px;
          display: none;
          background: url(./../../assets/images/ok.png) no-repeat center top;
          background-size: 10px;
</style>
