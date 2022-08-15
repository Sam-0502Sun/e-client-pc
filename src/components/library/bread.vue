<script>
import { h } from 'vue'

export default {
  name: 'Bread',
  // 用render渲染，就不能有template，单文件组件
  render () {
    // 返回值就是组件内容
    // vue2.0的 h 函数传惨进来， vue3.0的 h 函数需要导入进来
    // h的   第一个参数， 标签名字，    第二个参数标签属性对象，    第三个参数， 子节点

    // 1.创建xtx-bread父容器
    // 2.获取默认插槽内容
    // 3.去除bread-item组件的i 标签， 应该由render函数来组织
    // 4.遍历插槽中的item，得到一个动态创建的节点， 最后一个item不加i标签
    // 5.把动态创建的节点渲染在xtx-bread中

    const items = this.$slots.default()
    const dynamicItems = []
    items.forEach((item, i) => {
      dynamicItems.push(item)
      if (i < (items.length - 1)) {
        dynamicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dynamicItems)
  }
}
</script>

<style lang='less'>
// 去除scoped属性， 目的：样式作用到 bread-item组件 (Bread 和 BreadItem 不是父子关系，是插槽关系，样式深度作用::deep不起作用)
.xtx-bread {
  display: flex;
  padding: 25px 10px;

  &-item {
    a {
      color: #666;
      transition: all .4s;

      &:hover {
        color: @xtxColor;
      }
    }
  }

  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
