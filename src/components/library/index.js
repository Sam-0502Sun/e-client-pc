// 扩展vue原有功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入vue构造函数，在vue基础上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了App应用实例，在App基础上扩展

import Skeleton from '@/components/library/skeleton'
import Carousel from '@/components/library/carousel'
import More from '@/components/library/more'
import defaultImg from '@/assets/images/200.png'
import Bread from '@/components/library/bread'

export default {
  install (app) {
  //  在App上进行扩展，app提供component方法，directive函数
  //  如果要挂载原型,要挂载原型this.$http, app.config.globalProperties.$http,用中间这个方法就挂载了
    app.component(Skeleton.name, Skeleton)
    app.component(Carousel.name, Carousel)
    app.component(More.name, More)
    app.component(Bread.name, Bread)
    //  定义指令
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = (app) => {
//  图片懒加载
//  原理：现存储图片地址不能在src上，当图片进入可视区，将你存储图片的地址设置给图片元素即可
  app.directive('lazy', {
    mounted (el, binding) {
    //  创建一个观察对象，来观察当前指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          observe.observe(el)
          //  把指令的值设置给el的src属性，binding.value就是指令值
          // 图片处理加载失败
          el.onerror = () => {
          //  加载失败，设置默认值
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
    }
  })
}
