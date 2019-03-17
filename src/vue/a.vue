<template>
  <div class="flexbox1">
    <TestComponent>aaa</TestComponent>
    <div class="icon">
      <img src="../assets/icon.jpg">
    </div>
  </div>
</template>

<script>
import TestComponent from './component'

var url = process.env.BASE_API
console.log(url)
export default {
  components: {
    TestComponent
  },
  beforeCreate() {
    console.log('async的子组件 beforeCreat')
  },
  created() {
    console.log('async的子组件 created')
  },
  beforeMount() {
    console.log('async的子组件 beforeMount')
  },
  mounted() {
    console.log('async的子组件 mounted')
  },
  beforeDestroy() {
    console.log('async的子组件 beforeDestroy')
  },
  destroyed() {
    console.log('async的子组件 destroyed')
  }
}
</script>

<style lang="scss">
.flexbox1 {
  color: red;
  background: url('../assets/upload-logo.png');
}
</style>
