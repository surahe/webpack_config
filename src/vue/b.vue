<template>
  <div class="flexbox">
    <TestComponent>bbb</TestComponent>
  </div>
</template>

<script>
import TestComponent from './component'
export default {
  components: {
    TestComponent
  },
  beforeCreate() {
    console.log('APP的子组件 beforeCreat')
  },
  created() {
    console.log('APP的子组件 created')
  },
  beforeMount() {
    console.log('APP的子组件 beforeMount')
  },
  mounted() {
    console.log('APP的子组件 mounted')
  },
  beforeDestroy() {
    console.log('APP的子组件 beforeDestroy')
  },
  destroyed() {
    console.log('APP的子组件 destroyed')
  }
}
</script>

<style lang="scss">
  .flexbox {
    display: flex;
  }
</style>
