<template>
  <div id="app">
    <v-header v-bind:sellers="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
       <router-view></router-view>
    </keep-alive>
  </div>  
</template>

<script>
  import {urlParse} from '@/common/js/util';
  import headers from '@/components/header/header';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      var _this = this;
      _this.$axios.get(process.env.PATH + 'api/seller?id=' + this.seller.id).then((response) => {
        response = response.data;
        if (response.errno === ERR_OK) {
          _this.seller = Object.assign({}, _this.seller, response.data);
          console.log(_this.seller);
        }
      });
    },
    components: {
      'v-header': headers
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    .tab-item
      flex 1
      text-align center
      border-1px(rgba(7,17,27,0.1))
      &>a
        display block
        text-decoration none
        font-size 14px
        color rgb(77,85,93)
        &.active
          color rgb(240,20,20)
</style>
