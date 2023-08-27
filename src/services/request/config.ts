// 根据当前环境，动态设置axois请求的baseurl

/**
 * 方式一：/services/request/config.ts 创建对应的配置文件
 */

let BASE_URL = ''
const TIME_OUT = 5 * 60 * 1000
const env = process.env.NODE_ENV

if (env === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else {
  BASE_URL = 'http://xxxxx/prod'
}

export { BASE_URL, TIME_OUT }

/**
 * 方式二：在项目根目录分别创建.env.development 和 .env.production
 */
