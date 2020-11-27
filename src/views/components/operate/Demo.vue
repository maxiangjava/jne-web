<template>
  <div class="operate">
    <div>
      <button class="white-button">
        <img class="button-icon-text" src="@/assets/common/add-bold.png">添加
      </button>
      <button class="white-button" disabled="true">
        <img class="button-icon-text" style="opacity:0.5;" src="@/assets/common/remove.png">删除
      </button>
      <button class="white-button" disabled="true">
        <img class="button-icon-text" style="opacity:0.5;" src="@/assets/common/share.png">换组织
      </button>
      <button class="white-button">
        <img class="button-icon-text" src="@/assets/common/import.png">导入
      </button>
      <button class="white-button">
        <img class="button-icon-text" src="@/assets/common/export.png">导出
      </button>
      <button class="white-button">
        <img class="button-icon-text" src="@/assets/common/caiji.png">从采集设备导入生物特征
      </button>
    </div>
    <div style="margin-right: 10px">
      <input type="checkbox" class="check">
      包含下级组织
    </div>
  </div>
</template>

<script>
export default {
  name: "Demo"
}
</script>

<style scoped>

</style>