// 用户模块
export default {
  namespaced: true,
  state () {
    return {
    //  用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
  //  修改用户信息的方法, payload就是用户信息对象
  //  当setUser方法传入用户信息对象payload，则修改用户模块状态的profile（state.profile）
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
