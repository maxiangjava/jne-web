<template>
  <div class="operate">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
  export default {
    name: "Operate"
  }
</script>

<style lang="scss" scoped>
  .operate{
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    margin-bottom: 5px;
    padding-right: 10px;
  }

</style>