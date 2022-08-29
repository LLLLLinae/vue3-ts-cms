<template>
  <div class="phone">
    <el-form :model="account" :rules="rules" ref="form">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="account.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="account.code"></el-input
      ></el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    let account = reactive({ number: '', code: '' })
    let form = ref()
    let phoneLogin = function (v: boolean) {
      form.value.validate((valid: boolean) => {
        if (valid) {
          // console.log('发送phone登录请求')
        }
      })
    }
    const rules = {
      name: [{ required: true, message: '请输入手机号', triggers: 'blur' }],
      pws: [{ required: true, message: '请输入验证码', triggers: 'blur' }]
    }
    return {
      account,
      form,
      phoneLogin
    }
  }
})
</script>

<style scoped></style>
