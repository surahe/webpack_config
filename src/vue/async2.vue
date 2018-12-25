<template>
  <div class="ts-textarea-wrapper">
    <textarea class="ts-textarea" id="tsTextarea" cols="30" rows="8"></textarea>
    <div class="text-num-container">
      <span class="textarea-input-length" id="textareaInputLength"></span> / <span class="textarea-max-length" id="textareaMaxLength"></span>
    </div>
  </div>
</template>

<script>
export default {
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
    margin-top: 10px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 20px;
    border: none;
    resize: none;
    outline: 0;
    &.placeholder {
      color: gray;
    }
  }
  .text-num-container {
    position: absolute;
    right: 10px;
    bottom: 5px;
    font-size: 12px;
    color: #3F3F3F;
  }
  .textarea-input-length {
    color: #000;
    &.excee {
      color:#FF4339;
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

.transition-slide-down {
}
</style>
