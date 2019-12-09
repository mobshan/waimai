// 二维数组
// arr 的reduce方法
let arr = [1, 2, 3, 4, 5]
let sum = arr.reduce((total, currentValue) => {
  // console.log(total + 'total')
  // console.log(currentValue)
  // console.log(currentIndex)
  // console.log(arr + 'arr')
  return total + currentValue
}, 0)
console.log(sum)
