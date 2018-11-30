<!-- Vue Created by Administrator on 2018/10/22. -->
<template>
  <div class="pagecon">
    <div class="page prev" @click="prevHandler"></div>
    <div class="page-dropdown">
      <span @click="dropDownHandler"><strong>{{page}}</strong>/{{list.length}}</span>
      <div class="panel" v-show="show">
        <div class="bgcolor"></div>
        <div class="list scroll">
          <ul>
            <li v-for="(item, index) in list"
                :key="index"
                @click="hide(item)">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page next" @click="nextHandler"></div>
  </div>
</template>

<script>
  export default {
    name: 'CoursePage',
    data(){
      return {show: false, page:1, list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
    },
    methods:{
      prevHandler(){
        this.page--;
        this.page = this.page <= 0 ? 1 : this.page;
      },
      nextHandler(){
        this.page++;
        this.page = this.page >= this.list.length ? this.list.length : this.page;
      },
      show(){
        this.show = true;
      },
      dropDownHandler(){
        this.show = !this.show;
      },
      hide(page){
        this.page = page;
        this.show = false;
      }
    }
  }
</script>

<style scoped>
  .pagecon {
    user-select: none;
    width: 158px;
    height: 38px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
  }

  .page {
    width: 38px;
    height: 38px;
    transform: rotate(180deg);
    float: left;
    cursor: pointer;
    background: url(./../../assets/images/arrow.png) no-repeat 15px 10px;
    transition: .2s all;
  }

  .page:hover{
    background: url(./../../assets/images/arrow.png) no-repeat 16px 10px;
  }

  .page.next {
    float: right;
    margin-top: 2px;
    transform: rotate(0deg);
  }

  .page-dropdown {
    float: left;
    width: 78px;
    height: 38px;
    cursor: pointer;
    color: #a8def5;
    border-left: 2px solid rgba(255, 255, 255, 0.2);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    text-align: center;
  }

  .page-dropdown span:first-child {
    line-height: 38px;
    display: block;
    width: 100%;
    height: 100%;
  }

  .page-dropdown span:first-child strong {
    color: #FFF;
  }

  .panel {
    position: absolute;
    width: 82px;
    height: 230px;
    z-index: 10;
    background: #68c5ed;
    margin-top: -268px;
    margin-left: -1px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
  }

  .bgcolor, .list {
    left: 10px;
    right: 10px;
    top: 10px;
    background: #fff center center;
    border-radius: 4px;
    bottom: 10px;
    position: absolute;
  }
  .list{
    overflow-x:hidden;
    overflow-y: auto;
  }
  ul {
    padding: 0;
    margin: 0;
  }

  ul li {
    list-style: none;
    width: 60px;
    height: 30px;
    color: #666;
    line-height: 30px;
  }
</style>
