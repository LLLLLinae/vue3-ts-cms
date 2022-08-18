<template>
  <nav>
    <el-button>哈哈</el-button>
  </nav>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  // defineComponent函数定义时，定义了很多泛型，
  // 可以根据传入的参数进行类型推导，并且对某些值进行类型限制
  // 让组件的代码更加严谨
  export default defineComponent({
    name: 'App',
    props: {
      name: {
        type: String
      }
    }
  })
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
