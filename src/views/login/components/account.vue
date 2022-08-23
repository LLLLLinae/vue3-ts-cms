<template>
  <div class="account">
    <el-form :model="account" :rules="rules" ref="form">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"></el-input
      ></el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    let account = reactive({ name: '', password: '' })

    let form = ref()

    let accountLogin = function (isKeepPassword: boolean) {
      form.value.validate((valid: boolean) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    const rules = {
      name: [{ required: true, message: '请输入账号', triggers: 'blur' }],
      password: [{ required: true, message: '请输入密码', triggers: 'blur' }]
    }
    return {
      account,
      rules,
      form,
      accountLogin
    }
  }
})
</script>

<style scoped></style>
