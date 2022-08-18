/* eslint-disable */
// 该文件的意义： ts不能识别.vue文件，通过这个文件讲.vue文件声明为一个module
// 导出的是DefineComponent类型的实例
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare let BASE_URL: string
declare let VUE_APP_NAME: string
