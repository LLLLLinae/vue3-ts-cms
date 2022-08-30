<template>
  <div class="gfl-table">
    <el-table :data="tableData" border style="width: 100%">
      <template v-for="item in propData" :key="item.prop">
        <el-table-column v-bind="item"></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tableData: {
      type: Array,
      required: true
    },
    propData: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
