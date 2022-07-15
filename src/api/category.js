// 定义分类相关API接口
import request from '@/utils/request'

// 获取所有分类(顶级，二级，对应的商品推荐数据)，  @return Promise
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
