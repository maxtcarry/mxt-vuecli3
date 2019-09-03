import Vue from 'vue'
Vue.directive('con', {
  // 当被绑定的元素插入到 DOM 中时……
  bind: function (el,binding) {
    // 聚焦元素
    el.style.color = '#f00';
    el.style.filter='blur(1px)';
    console.log(el.style.color)
    console.log(binding);
  }
})
