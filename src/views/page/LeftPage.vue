<template>
  <div>
    0
  </div>
</template>

<script>
import DATA from "@/views/data"

  export default {
    name: "LeftPage",
    data() {
      return {
        data: DATA.organization,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  }
</script>

<style scoped>

</style>