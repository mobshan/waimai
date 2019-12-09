// 在取vuex中的数据时，先将这个数据处理一下，类似于vue中的计算属性
export default {
  totalCount(state) {
    return state.cartFoods.reduce((total, food) => total + food.count, 0)
  },
  totalPrice(state) {
    return state.cartFoods.reduce(
      (totalPrice, food) => totalPrice + food.count * food.price,
      0
    )
  }
}
