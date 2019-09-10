import Vue from 'vue'
//全局filter  
Vue.filter('delnum',function(value) {
  let exp = /\d+/g;
return   value.match(exp).toString();

})
