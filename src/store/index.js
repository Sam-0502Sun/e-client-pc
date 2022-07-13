import { createStore } from 'vuex'
import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate' // 持久化存储插件

// vue2.0创建仓库 new vuex.Store({})
// vue3.0创建仓库 createStore({})
export default createStore({
  // state存储状态的
  state: {},
  // 写计算属性的
  getters: {},
  // 修改方法的
  mutations: {},
  // 拿数据的
  actions: {},
  // 分模块的
  modules: {
    cart,
    category,
    user
  },
  // 配置插件
  plugins: [
    // 默认存储在localstorage上
    createPersistedState({
      //  本地存储的名字
      key: 'erabbit-client-pc',
      //  指定需要存储的模块
      paths: [
        'user',
        'cart'
      ]
    })
  ]
})
