<template>
  <div>
    <RouterView />
    <TestA />
    <TestB />
  </div>
</template>

<script>
import TestA from './a'
import TestB from './b'

export default {
  components: {
    TestA,
    TestB
  },
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style lang="scss">
.red {
  color: red;
  .bold {
    font-weight: bold;
  }
}
</style>
