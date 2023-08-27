import axios from 'axios'

/**
 * 全局配置
 */
axios.defaults.baseURL = 'xxxxxx'
axios.defaults.timeout = 60000

axios
  .get('/someurl', {
    params: {
      name: 'lucien'
    },
    timeout: 10000 // 局部配置
  })
  .then((res) => {
    console.log(res)
  })

axios
  .post('/someurl', {
    data: {
      name: 'lucien'
    }
  })
  .then((res) => {
    console.log(res)
  })

//axios.all ->多个请求，一起返回。原理就是promise.all
axios
  .all([
    axios.get('/url1', { params: { name: 'lucien' } }),
    axios.post('url2', { data: { name: 'lucien' } })
  ])
  .then((res) => {
    console.log(res)
  })

/**
 * axios拦截器-请求
 * use(fnc1, fnc2)，第一个是请求发送成功的回调，第二个是请求发送失败的回调
 */
axios.interceptors.request.use(
  (config) => {
    // step1:请求添加token
    // step2：isLoading动画
    return config
  },
  (err) => {
    return err
  }
)
/**
 * axios拦截器-响应
 * use(fnc1, fnc2)，第一个是数据响应成功的回调（状态码为20x），第二个是数据响应失败的回调（状态码40x，50x）
 */
axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return err
  }
)
