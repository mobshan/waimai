<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <template v-slot:left>
        <span class="header_search">
          <i class="iconfont icon-sousuo"></i>
        </span>
      </template>

      <template v-slot:right>
        <span class="header_login">
          <span class="header_login_text">登录|注册</span>
        </span>
      </template>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <!-- 轮播 -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index ) in categorysArr" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category, index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList></ShopList>
  </section>
</template>
<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'
// 导出swiper的构造函数
import Swiper from 'swiper'
// 手动引用swiper的样式
import 'swiper/css/swiper.min.css'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    ...mapState(['address', 'categorys']),
    categorysArr() {
      const { categorys } = this
      const arr = []
      // 3.准备一个小数组--pages(最大长度为8)
      let minArr = []
      // 4.遍历categorys得到处理后的二维数组catagorysArr
      categorys.forEach(data => {
        // 如果当前小数组(pages)已经满了, 创建一个新的
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果minArr是空的, 将小数组(pages)保存到大数组(categorysArr)中
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 将当前分类信息保存到小数组(pages)中
        minArr.push(data)
      })
      return arr
    }
  },
  mounted() {
    // 发送获取分类请求
    this.$store.dispatch('getCategorys')
    // 此处是方法环境，并不是对象环境
    new Swiper('.swiper-container', {
      loop: 'true',
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
  }
}
</script>
<style lang="scss" >
@import '../../common/sass/mixins.scss';
.msite {
  // 首页
  width: 100%;
  overflow: hidden;
  .msite_header {
    background-color: #02a774;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;
  }
  .msite_nav {
    @include bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        width: 100%;
        height: 100%;
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          .link_to_food {
            width: 25%;
            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;
              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }
            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }
      .swiper-pagination {
        > span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }
}
</style>


