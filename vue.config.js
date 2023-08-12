const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  /**
   * 1.配置方式一：vue-cli提供的属性, 属性名字会跟webpack不一样，但效果都是一一对应的
   */
  outputDir: './dist',
  /**
   * 2. 配置方式二：和webpack的属性是完全一致的，最后会以merge的方式完全合并
   * @param {*} config
   */
  configureWebpack: {
    resolve: {
      alias: {
        '@components': '@/components'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  // 对于和webpack一样的属性，我们有两种方式去写，一种是上面对象的形式，另一种是通过函数形式。这两种方式的区别是，上面的会在原有默认webpack配置的基础上进行合并，而下面这中会覆盖
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'), // 这行不能省略，因为通过函数配置，cli默认的webpack配置会失效
  //     '@components': '@/components'
  //   }
  // }
  /**
   * 3. 配置方式三：链式
   */
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('@components', '@/components')
  // }
}
