import moment from 'moment/moment'
// 时间格式转换
export const formatTime = (time, formatString = 'YYYY.MM.DD HH:mm:ss') => {
  return moment(time).format(formatString)
}

const filters = {
  // 格式化时间
  formatTime: (time, format = 'YYYY.MM.DD HH:mm:ss') => {
    if(time == null) {
      return "1970.01.01"
    }
    return formatTime(time, format)
  },
  price: (price) => {
    if(price == null) {
      return 0.00
    }
    return price.toFixed(2)
  },
  orderStatus: (status) => {
    switch (status){
      case 0: return '待付款'
        break;
      case 1: return '已支付'
        break;
      case 2: return '已出票'
        break;
      case 3: return '已过期'
        break;
      case 4: return '已完成'
        break;
      case 5: return '已超时'
        break;
      case 6: return '已取消'
        break;
      default: return '待付款'
        break;
    }
  }
}

export default {
  install: Vue => {
    for (let key in filters) {
      Vue.filter(key, filters[key])
    }
  }
}
