// 提供首页相关API函数
import request from '@/utils/request'

// 获取品牌，limit是品牌个数，参数
// return promise
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

// 获取广告区轮播图
// return promise
export const findBanner = () => {
  return request('/home/banner', 'get')
}

// 获取新鲜好物
// return promise
export const findNew = () => {
  return request('/home/new', 'get')
}

// 获取人气推荐
// return promise
export const findHot = () => {
  return request('/home/hot', 'get')
}

// 获取商品板块
// return promise
export const findGoods = () => {
  return request('/home/goods', 'get')
}

// 获取最新专题板块
// return promise
export const findSpecial = () => {
  return request('/home/special', 'get')
}
