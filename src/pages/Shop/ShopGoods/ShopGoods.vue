<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <!-- 菜单对应的是食物分类列表-->
        <ul>
          <!--current-->
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            @click="moveRight(index)"
            :class="{current:index === currentIndex}"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <!-- 右侧的食物列表是根据左侧的分类列表展现的-->
        <!-- 所以右侧是在一个分类标题列表里面嵌套着各类食物列表-->
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CartControl from '../../../components/CartControl/CartControl'
import ShopCart from '../../../components/ShopCart/ShopCart'
import BScroll from 'better-scroll'
import Food from '../../../components/Food/Food'
export default {
  data() {
    return {
      scrollY: 0, //右侧向上折叠高度
      tops: [], // 右侧每个条目高度
      food: {}
    }
  },
  components: {
    CartControl,
    Food,
    ShopCart
  },
  computed: {
    ...mapState(['goods']),
    currentIndex() {
      const { tops, scrollY } = this
      const index = tops.findIndex((top, index) => {
        // return 一个布尔值，如果为true,就说明找到了
        return scrollY >= top && scrollY < tops[index + 1]
      })
      return index
    }
  },
  mounted() {
    this.$store.dispatch('getShopGoods', () => {
      this.$nextTick(() => {
        // 列表数据更新显示后执行
        this._initScroll()
        this._initTops()
      })
    })
  },
  methods: {
    _initScroll() {
      console.log(1)
      new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 2, // 必须加上，不然无法监听高度，控制高度
        click: true
      })
      this.foodsScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
      // 给右侧列表绑定scroll结束的监听
      this.foodsScroll.on('scrollEnd', ({ x, y }) => {
        console.log('scrollEnd', x, y)
        this.scrollY = Math.abs(y)
      })
    },
    _initTops() {
      let tops = []
      let top = 0
      // 获取ul
      tops.push(top)
      const lis = this.$refs.foodsUl.children
      // 此时取出的lis是一个元素列表，是伪数组
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      console.log(tops)
      this.tops = tops
    },
    moveRight(index) {
      // console.log(index)
      // 使用右侧列表滑动到对应的位置

      // 得到目标位置的scrollY
      const scrollY = this.tops[index]
      // 立即更新scrollY(让点击的分类项成为当前分类)
      this.scrollY = scrollY
      // 平滑滑动右侧列表 better-scroll里的方法
      this.foodsScroll.scrollTo(0, -scrollY, 300)
    },
    showFood(food) {
      this.food = food
      // 让食物组件显示
      this.$refs.food.toogleFoodShow()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/stylus">
@import '../../../common/sass/mixins.scss';
.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;
        .text {
          border: none;
        }
      }
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        @include bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include bottom-border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        border: none;
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
