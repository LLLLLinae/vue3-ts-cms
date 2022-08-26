<template>
  <div class="user">
    <h2>user</h2>
    <gfl-form v-bind="searchFormConfig"></gfl-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import GflForm, { IFormItem } from '@/base-ui/form'
import { searchFormConfig } from './config/seatch.config'

export default defineComponent({
  name: 'user',
  components: { GflForm },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
