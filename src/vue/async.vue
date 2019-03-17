<template>
  <div class="bottom-option">
    <button class="button">
      111
    </button>
    <button class="button confirm">
      222
    </button>
    <TestA />
  </div>
</template>

<script>
import TestA from './a'
export default {
  components: {
    TestA
  },
  beforeCreate() {
    console.log('async beforeCreat')
  },
  created() {
    console.log('async created')
  },
  beforeMount() {
    console.log('async beforeMount')
  },
  mounted() {
    console.log('async mounted')
  },
  beforeDestroy() {
    console.log('async beforeDestroy')
  },
  destroyed() {
    console.log('async destroyed')
  }
}
</script>

<style lang="scss" scoped>
.bottom-option {
  text-align: center;
  background: $blue;
  @include break-line();
  button {
    width: 120px;
    height: 42px;
    padding: 8px 0;
    color: blue;
    font-size: 17px;
    line-height: 24px;
    text-align: center;
    border: 1px solid blue;
    border-radius: 20px;
    cursor: pointer;
    &.confirm {
      margin-left: 20px;
      background: blue;
      color: #fff;
    }
    &:hover {
      background: #003B8B;
      color: #fff;
    }
  }
  .flexbox1 {
    color: darkblue;
  }
  .flexbox1 /deep/ .icon {
    background: black;
  }
}
</style>
