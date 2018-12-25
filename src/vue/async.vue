<template>
  <div class="bottom-option">
    <button class="button">
      111
    </button>
    <button class="button confirm">
      222
    </button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.bottom-option {
  text-align: center;
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
}
</style>
