<template>
  <div class="home">
  <p>{{title|delnum}}</p>
    <HelloWorld v-con='1 + 2' msg="Welcome to Your Vue.js App" ref='hello'/>
    <router-link to="/home/home1">Home1</router-link> |
    <router-link to="/home/home2">Home2</router-link>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import mixin from '@/mixin/mixin.js'
// import delnum from '@/filter/filter.js'
require('@/directive/directive.js');
require('@/filter/filter.js');
export default {
  name: 'home',
  data:function(){
    return{
      title:'1123dasds1232'
    }
  },
  mixins:[mixin],
  components: {
    HelloWorld
  },
  mounted:function() {
    console.log(this.$refs.hello)
  },
}
</script>
