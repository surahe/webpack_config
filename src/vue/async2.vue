<template>
  <div class="ts-textarea-wrapper">
    <textarea
      id="tsTextarea"
      class="ts-textarea"
      cols="30"
      rows="8"
    />
    <div class="text-num-container">
      <span
        id="textareaInputLength"
        class="textarea-input-length"
      /> /
      <span
        id="textareaMaxLength"
        class="textarea-max-length"
      />
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    console.log('async2 beforeCreat')
  },
  created() {
    console.log('async2 created')
  },
  beforeMount() {
    console.log('async2 beforeMount')
  },
  mounted() {
    console.log('async2 mounted')
  },
  beforeDestroy() {
    console.log('async2 beforeDestroy')
  },
  destroyed() {
    console.log('async2 destroyed')
  }
}
</script>

<style lang="scss">
.ts-textarea-wrapper {
  position: relative;
  padding-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  .ts-textarea {
    box-sizing: border-box;
    width: 100%;
    height: 120px;
    padding: 0 10px;
    margin-top: 10px;
    border: none;
    outline: 0;
    resize: none;
    font-size: 14px;
    line-height: 20px;

    &.placeholder {
      color: gray;
    }
  }

  .text-num-container {
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-size: 12px;
    color: #3f3f3f;
  }

  .textarea-input-length {
    color: #000;

    &.excee {
      color: #ff4339;
    }
  }
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translate3d(0, -10%, 0);
  }

  100% {
    opacity: 100%;
    transform: translate3d(0, 0, 0);
  }
}
</style>
