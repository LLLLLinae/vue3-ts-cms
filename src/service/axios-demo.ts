import axios from 'axios'
//
// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res)
// })
//
// axios.get('http://httpbin.org/get', {
//   params: {
//     name: '张三'
//   }
// })
//
// axios.get('http://httpbin.org/get?id=111')
//
// axios.post('http://httpbin.org/post', {
//   data: { old: 18 }
// })

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 3000

axios.get('/get?id=111', {
  timeout: 1000
})

axios.post('/post', {
  data: { old: 18 }
})
