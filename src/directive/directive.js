/**
 * @Date:   2019-08-27T10:25:50+08:00
 * @Last modified time: 2019-09-10T15:24:12+08:00
 */

import Vue from 'vue'
//全局自定义指令
Vue.directive('con', {
  // 当被绑定的元素插入到 DOM 中时……
  bind: function (el,binding,vnode,oldVnode) {
    /**
     * [binding]
     * @type {obj}
     *   -name          |   指令名称
     *   -value         |   指令绑定的值
     *   -oldvalue      |   指令绑定的前一个值
     *   -expression    |   字符串形式的指令表达式
     *   -arg           |   传给指令的参数
     *    modifiers     |   一个包含修饰符的对象
     */
    // 聚焦元素
    el.style.color = '#f00';
    el.style.filter='blur(1px)';
    console.log(el.style.color)
    console.log(binding);
  },
  inserted:function(el,binding){
    //被绑定元素插入父节点时调用 注：不一定已被插入节点
    console.log('22',el,binding)
  },
  update:function (el,binding){
    //所在组件VNode 更新时 注：可能发生在更新之前
  },
  componentUpdated:function(el,binding){
    //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  },
  unbind:function(){
    //只调用一次，指令与元素解绑时调用。
  }
})
