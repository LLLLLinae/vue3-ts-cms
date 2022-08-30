<template>
  <div class="page-search">
    <gfl-form v-bind="searchFormConfig">
      <template #header> <h1 class="header">高级检索</h1></template>
      <template #footer>
        <div class="handle-btns">
          <el-button>重置</el-button>
          <el-button type="primary">搜索</el-button>
        </div>
      </template>
    </gfl-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GflForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: { GflForm },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
