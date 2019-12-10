import Vue from 'vue'
import dayjs from 'dayjs'
// 自定义过滤器
Vue.filter('dateFormat', function(value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(value).format(formatStr)
})
