<template>
  <div class="flexbox1">
    <TestComponent>aaa</TestComponent>
    <div>
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
  }
}
</script>

<style module lang="scss">
.flexbox1 {
  color: red;
  background: url('../assets/upload-logo.png');
}
</style>
