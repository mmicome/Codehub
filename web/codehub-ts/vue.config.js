const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin"); // compression-webpack-plugin插件需要npm安装
const ImageminPlugin = require("imagemin-webpack-plugin").default;
//可视化地分析打包结果。
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const webpack = require("webpack");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "//some.cdn.com" : "/",
  outputDir: 'dist',
  lintOnSave: "error", // 设置eslint报错时停止代码编译
  productionSourceMap: false, // 不需要生产环境的 source map（减小dist文件大小，加速构建）
  devServer: {
    open: true, // npm run serve后自动打开页面
    host: "localhost.icome.com", // 匹配本机IP地址(默认是0.0.0.0)
    port: 8989, // 开发服务器运行端口号
    proxy: {
      "/api": {
        target: "http://localhost.middle.com", // 代理接口地址
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/api": "" //需要rewrite的, 这里理解成以'/api'开头的接口地址，把/api代替target中的地址
        }
      }
    },
    //设置 eslint 后建议配置开发服务器的 overlay 选项，在 eslint 报错时会覆盖在页面上，时刻提醒你写代码得有信条
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pwa: {
    themeColor: "#ffffff",
    msTileColor: "#ffffff",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    },
    iconPaths: {
      favicon32: "img/icons/favicon-mountain-32x32.png",
      favicon16: "img/icons/favicon-mountain-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/msapplication-icon-144x144.png"
    }
  },
  chainWebpack: config => {
    config
        .output
        .filename('js/[name].[hash:3].js') 
        .chunkFilename('js/[name].[hash:8].js')
    config.resolve.alias
      .set("@views", resolve("./src/views"))
      .set("@router", resolve("./src/router"))
      .set("@store", resolve("./src/store"))
      .set("@utils", resolve("./src/utils"))
      .set("@config", resolve("./src/config"))
      .set("@api", resolve("./src/api"))
      .set("@components", resolve("./src/components"))
      .set("@assets", resolve("./src/assets"))
      // 定义run time vue
      .set("vue$", "vue/dist/vue.esm.js")
      // 定义接口 api
      .set("api", resolve("./src/api/api.js"));
    // 移除 prefetch 插件(针对生产环境首屏请求数进行优化)
    // config.plugins.delete('prefetch')
    // 移除 preload 插件(针对生产环境首屏请求数进行优化)   preload 插件的用途：https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
    // config.plugins.delete('preload')
    // 第1个参数：别名，第2个参数：路径  （设置路径别名）
    config.resolve.symlinks(true);
    config.plugin("preload").tap(options => {
      options[0] = {
        rel: "preload",
        as(entry) {
          if (/\.css$/.test(entry)) return "style";
          if (/\.(woff||ttf)$/.test(entry)) return "font";
          if (/\.png$/.test(entry)) return "image";
          return "script";
        },
        include: "allAssets",
        fileBlacklist: [/\.map$/, /hot-update\.js$/]
      };
      return options;
    });
  },
  // 配置打包 js、css文件为.gz格式，优化加载速度  （参考：https://blog.csdn.net/qq_31677507/article/details/102742196）
  configureWebpack: config => {
    // config.output = {
    //   filename: "js/app.[hash:8].js",
    //   chunkFilename: 'js/[name].[hash:8].js'
    // }
    config.resolve.extensions = [
      ".ts",
      ".js",
      ".json",
      ".vue",
      ".scss",
      ".css"
    ];
    // 类似 Vue（vue.rumtime.esm.js）、VueRouter（vue-router.esm.js）这样的三方库占用了大面积打包资源。这样的三方库随着项目迭代，可能会越来越多（如 elementUI、moment 等），而它们又不跟随业务的变化而改动代码，不需要打包。我们可以借助 webpack 的 externals 选项将他们抽离出来：
    // CDN 的方式将它们挂到 window;  in public index.html
    config.externals = {
      vue: "window.Vue",
      "vue-router": "window.VueRouter"
      // 其他三方库 ...
    };
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/, // 匹配文件
            threshold: 10240, // 超过10kB的数据进行压缩
            deleteOriginalAssets: false // 是否删除原文件 （原文件也建议发布到服务器以支持不兼容gzip的浏览器）
          }),
          new BundleAnalyzerPlugin(),
          //vue-cli3 搭建的工程没有自带图片优化插件
          new ImageminPlugin({
            disable: process.env.NODE_ENV !== "production", // Disable during development
            pngquant: {
              quality: "95-100"
            }
          }),
          //自动加载库,如以后要遇到或处理 jQuery 或 $ 都会去自动加载 jquery 这个库
          new webpack.ProvidePlugin({
            _: "lodash",
            $: "jquery",
            jQuery: "jquery",
            api: "api" //自动引入api
          })
        ],
        performance: {
          // 生产环境构建代码文件超出以下配置大小会在命令行中显示警告
          hints: "warning",
          // 入口起点的最大体积 整数类型（以字节为单位,默认值是：250000 (bytes)）
          maxEntrypointSize: 5000000,
          // 生成文件的最大体积 整数类型（以字节为单位,默认值是：250000 (bytes)）
          maxAssetSize: 3000000
          // // 只给出 js 文件的性能提示
          // assetFilter: function (assetFilename) {
          //   return assetFilename.endsWith('.js')
          // }
        }
      };
    }
  }
};
