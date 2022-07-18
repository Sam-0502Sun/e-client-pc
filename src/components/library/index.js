// 扩展vue原有功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入vue构造函数，在vue基础上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了App应用实例，在App基础上扩展

import Skeleton from '@/components/library/skeleton'
import Carousel from '@/components/library/carousel'
import More from '@/components/library/more'

export default {
  install (app) {
  //  在App上进行扩展，app提供component方法，directive函数
  //  如果要挂载原型,要挂载原型this.$http, app.config.globalProperties.$http,用中间这个方法就挂载了
    app.component(Skeleton.name, Skeleton)
    app.component(Carousel.name, Carousel)
    app.component(More.name, More)
  }
}
