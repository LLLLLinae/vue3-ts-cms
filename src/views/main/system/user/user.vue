<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig">
      <template #header><span>标题</span></template>
    </page-search>
    <GflTable :tableData="tableData" :propData="propData"></GflTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import GflTable from '@/base-ui/table'

import { searchFormConfig } from './config/seatch.config'

export default defineComponent({
  name: 'user',
  components: { PageSearch, GflTable },
  setup() {
    // 获取用户列表数据
    const store = useStore()
    store.dispatch('system/getUserListData')
    const tableData = computed(() => store.state.system.userList)

    // 表格样式数据
    const propData = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      }
    ]
    return {
      searchFormConfig,
      tableData,
      propData
    }
  }
})
</script>

<style scoped></style>
