const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
//骨架屏
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
//zip压缩
const CompressionPlugin = require("Compression-webpack-plugin")
//去除多余css
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
const purgecss = require("@fullhuman/postcss-purgecss");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
let plugins = [];
if (IS_PROD) {
  plugins.push(postcssImport);
  plugins.push(
    purgecss({
      content: ["./src/**/*.vue"],
      extractors: [{
        extractor: class Extractor {
          static extract(content) {
            const validSection = content.replace(
              /<style([\s\S]*?)<\/style>+/gim,
              ""
            );
            return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
          }
        },
        extensions: ["vue"]
      }]
    })
  );
}

// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  publicPath: process.env.NODE_ENV === 'production' ?
    './' : './',
  // 将构建好的文件输出到哪里
  outputDir: 'dist',

  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: './static',

  // 默认起始页文件
  indexPath: 'index.html',

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,
  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  // compiler: false,
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('@a', resolve('src/assets'))
      .set('@api', resolve('src/axios/api'))
      .set('libs', resolve('src/libs'))
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: "65-90",
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        webp: {
          quality: 75
        }
      });
    //打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static',
        }]);
    }
    config.output.chunkFilename(`js/[name].[chunkhash:8].js`)

  },

  configureWebpack: (config) => {
    //开启页面 骨架屏 ： 基于自定义页面  不根据页面元素生成 需要手动写骨架屏
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/skeleton/skeleton.config.js'),
        },
      },
      router: {
        mode: 'hash',
        routes: [{
            path: '/',
            skeletonId: 'Skeleton1'
          },
          {
            path: '/about',
            skeletonId: 'Skeleton2'
          }
        ]
      },
      minimize: true,
      quiet: true,
    }))
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      // 开启压缩
      config.plugins.push(new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, //匹配的文件
        threshold: 10240, //对超过10k的进行压缩
        deleteOriginalAssets: true //是否删除文件
      }))

    } else if (process.env.NODE_ENV === 'development') {
      // 为开发环境修改配置...
      console.log('开发环境')


    } else if (process.env.NODE_ENV === 'testing') {
      // 为测试环境修改配置...
      console.log('测试环境')
    }
  },

  // CSS 相关选项
  css: {
    //css分离 开发环境注释掉避免css热更新 失效
    //extract: true,
    // 是否开启 CSS source map？
    sourceMap: process.env.NODE_ENV !== 'production',

    // 为预处理器的 loader 传递自定义选项。比如传递给
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: { //pc 需要关掉
        plugins: [
          require("postcss-px2rem")({
            remUnit: 37.5,

          })
        ]
      }
    },

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false,

  },
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  // 配置 webpack-dev-server 行为。
  devServer: {
    host: 'localhost',
    port: 8023,
    https: false,
    hotOnly: false,
    open: 'Chrome',

    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:7001',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  // 第三方插件的选项
  pluginOptions: {
    env: {
      TEST: 'vue.config.js-->pluginOptions.env:TEST Global Parameters'
    },
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/less/settings.less')
      ]
    }
  },
  presets: [["@vue/app",{"useBuiltIns": "entry"}]],// ie 兼容配置
  plugins: [...plugins, autoprefixer] //去除多余css 插件入口
}
