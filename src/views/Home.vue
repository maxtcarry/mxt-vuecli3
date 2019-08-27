<template>
  <div class="home">

    <HelloWorld v-con='1 + 1' msg="Welcome to Your Vue.js App" ref='hello'/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import mixin from '@/mixin/mixin.js'
import con from '@/directive/directive.js'
export default {
  name: 'home',
  mixins:[mixin],
  components: {
    HelloWorld
  },
  mounted:function() {

    console.log(this.$refs.hello)
  },
}
</script>
