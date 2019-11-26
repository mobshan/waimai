<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(star,index) in starArr" :key="index" :class="star"></span>
  </div>
</template>
<script>
export default {
  props: {
    // 记得要定义数据类型，因为vue害怕你写好的组件，别人不知道传什么样的值
    rating: Number,
    size: String
  },
  computed: {
    starArr() {
      // 先拿到rating 3.6
      // 取整
      // const {a} = {a:'hello'}
      // const rating = this.rating
      let arr = []
      const { rating } = this
      const intNum = Math.floor(rating)
      for (let i = 0; i < intNum; i++) {
        arr.push('on')
      }
      // 再判断小数，如果小数大于0.5-->半个，如果小于0.5--> 空
      // -----在Js计算浮点数可以会出错 ， 所以我们先将小数*10   再判断与5的比较
      const floatNum = rating * 10 - intNum * 10
      if (floatNum >= 5) {
        arr.push('half')
      }
      const rest = 5 - arr.length
      for (let i = 0; i < rest; i++) {
        arr.push('off')
      }
      // let arr = ['on', 'on', 'on', 'half', 'off']
      return arr
    }
  }
}
</script>
<style lang="scss">
@import '../../common/sass/mixins.scss';
.star {
  // 2x图 3x图
  float: left;
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('./images/stars/star48_on');
      }
      &.half {
        @include bg-image('./images/stars/star48_half');
      }
      &.off {
        @include bg-image('./images/stars/star48_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('./images/stars/star36_on');
      }
      &.half {
        @include bg-image('./images/stars/star36_half');
      }
      &.off {
        @include bg-image('./images/stars/star36_off');
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('./images/stars/star24_on');
      }
      &.half {
        @include bg-image('./images/stars/star24_half');
      }
      &.off {
        @include bg-image('./images/stars/star24_off');
      }
    }
  }
}
</style>