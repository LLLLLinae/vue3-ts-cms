<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="account"></login-account>
      </el-tab-pane>
      <el-tab-pane label="手机登录" name="phone">
        <phone-account ref="phone"></phone-account>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="remember" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="onLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from '@/views/login/components/account.vue'
import PhoneAccount from '@/views/login/components/phone.vue'

export default defineComponent({
  components: { LoginAccount, PhoneAccount },
  setup() {
    let remember = ref(false)
    let account = ref<InstanceType<typeof LoginAccount>>()
    let phone = ref<InstanceType<typeof PhoneAccount>>()
    let currentTab = ref('account')

    let onLogin = function () {
      // console.log(account.value)
      if (currentTab.value === 'account') {
        account.value?.accountLogin(remember.value)
      } else {
        phone.value?.phoneLogin(remember.value)
      }
    }

    return {
      remember,
      account,
      phone,
      currentTab,
      onLogin
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
