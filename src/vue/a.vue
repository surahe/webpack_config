<template>
  <div :class="$style.flexbox">
    <TestComponent>aaa</TestComponent>
  </div>
</template>

<script>
import TestComponent from './component'
export default {
  components: {
    TestComponent
  }
}
</script>

<style module lang="scss">
.flexbox {
  display: flex;
}
</style>
