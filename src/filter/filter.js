import Vue from 'vue'
Vue.filter('delnum',function(value) {
  let exp = /\d+/g;
return   value.match(exp).toString();

})
