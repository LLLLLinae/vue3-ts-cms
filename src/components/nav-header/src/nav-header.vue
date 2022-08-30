<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <gfl-breadcrumbs :breadcrumbs="userBreadcrumbs"></gfl-breadcrumbs>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { defineComponent, ref, computed } from 'vue'

import GflBreadcrumbs from '@/base-ui/breadcrumb'
import BreadCrumbs from '@/base-ui/breadcrumb/src/breadcrumbs.vue'
import { pathMapToMenu, pathMapBreadcrumbs } from '@/utils/map-menus'

import UserInfo from './user-info.vue'

export default defineComponent({
  components: {
    UserInfo,
    GflBreadcrumbs
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    // 面包屑的数据: [{name: , path: }]
    const store = useStore()
    const userBreadcrumbs = computed(() => {
      const menus = store.state.login.userMenus
      const currentPath = useRoute().path
      return pathMapBreadcrumbs(menus, currentPath)
    })

    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      handleFoldClick,
      userBreadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
