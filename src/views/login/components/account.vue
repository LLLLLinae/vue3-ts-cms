<template>
  <div class="account">
    <el-form :model="account" :rules="rules">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pws">
        <el-input v-model="account.pws"></el-input
      ></el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    let account = reactive({ name: '', pws: '' })
    let accountLogin = function (v: boolean) {
      console.log(v)
      console.log('发送account登录请求')
    }
    const rules = {
      name: [{ required: true, message: '请输入账号', triggers: 'blur' }],
      pws: [{ required: true, message: '请输入密码', triggers: 'blur' }]
    }
    return {
      account,
      rules,
      accountLogin
    }
  }
})
</script>

<style scoped></style>
