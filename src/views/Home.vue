<template>
  <div class="home">
  <p>{{title|delnum}}</p>
    <HelloWorld v-con='1 + 1' msg="Welcome to Your Vue.js App" ref='hello'/>
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
