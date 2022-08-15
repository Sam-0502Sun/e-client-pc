// 扩展vue原有功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入vue构造函数，在vue基础上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了App应用实例，在App基础上扩展
import defaultImg from '@/assets/images/200.png'
// import Skeleton from '@/components/library/skeleton'
// import Carousel from '@/components/library/carousel'
// import More from '@/components/library/more'
//
// import Bread from '@/components/library/bread'
// import BreadItem from '@/components/library/bread-item'

// 使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
// 然后 context 函数会返回一个导入函数 importFn
// 它又一个属性 keys() 获取所有的文件路径
// 通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
// 遍历的同时进行全局注册即可

// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// context参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
// 注意，require 是由 webpack 提供的一个自动导入功能的 API
const importFn = require.context('./', false, /\.vue$/)
// console.dir(importFn.keys()) 文件名称数组

export default {
  install (app) {
    //  在App上进行扩展，app提供component方法，directive函数指令
    //  如果要挂载原型,要挂载原型this.$http, app.config.globalProperties.$http,用中间这个方法就挂载了
    // app.component(Skeleton.name, Skeleton)
    // app.component(Carousel.name, Carousel)
    // app.component(More.name, More)
    // app.component(Bread.name, Bread)
    // app.component(BreadItem.name, BreadItem)

    // 根据keys批量注册
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })

    //  定义指令
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = (app) => {
//  图片懒加载
//  原理：现存储图片地址不能在src上，当图片进入可视区，将你存储图片的地址设置给图片元素即可
//  指令v-lazy，直接叫lazy
  app.directive('lazy', {
    // vue2.0监听使用指令的DOM是否创建好，钩子函数：inserted
    // vue3.0的指令拥有的钩子函数和组件一样，使用指令的DOM是否创建好，钩子函数：mounted
    mounted (el, binding) {
      //  创建一个观察对象，来观察当前指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
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
      //  开启观察
      observe.observe(el)
    }
  })
}
