<template>
  <!-- vue2.0需要根元素， vue3.0可以是代码片段 Fragment -->
  <div class="container">
    App {{$store.state.user.profile.account}}
    <button @click="$store.commit('user/setUser', {account: 'Sam'})">设置用户信息</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  setup () {
  }
}
</script>

<style lang="less">
</style>
