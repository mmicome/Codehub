## 使用vue框架开发，版本更新，解决用户浏览器缓存问题

vue-cli里的默认配置，css和js的名字都加了哈希值，所以新版本css、js和就旧版本的名字是不同的，不会有缓存问题。
一般通过 vue-cli 的项目，默认的 webpack 线上配置文件会配置 

    output：
    filename: utils.assetsPath('js/[name].[chunkhash].js')
    
不过值得注意的是，把打包好的index.html放到服务器里去的时候，index.html在服务器端可能是有缓存的，这需要在服务器配置不让缓存index.html
nginx 配置，让index.html不缓存

```
location = /index.html {
    add_header Cache-Control "no-cache, no-store";
}
```

    no-cache, no-store可以只设置一个
    no-cache浏览器会缓存，但刷新页面或者重新打开时 会请求服务器，服务器可以响应304，如果文件有改动就会响应200
    no-store浏览器不缓存，刷新页面需要重新下载页面

## vue SPA项目，浏览器和nginx反向代理缓存问题解决实方案 

https://juejin.im/post/5c09cbb1f265da617006ee83

https://cloud.tencent.com/developer/article/1353428

问题背景a.浏览器端在每次发布新的版本时候，总会出现因为单页面项目中index.html文件`（200 ok from disk cache )`不发送请求，直接取用了本地磁盘缓存,和服务端版本不一致的问题，导致用户不能及时更新，需要通过手动刷新来强制从服务端更新文件。

## 使用vue，版本更新，解决用户浏览器缓存问题

1、修改 webpack .prod.conf.js 文件

    const version = new Date().getTime();
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:8].' + version + '.js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].' + version + '.js')
    }

2、在 html 页面前面加 meta 标签。

    <meta http-equiv="pragram" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

3、html 页面加载脚本的时候给脚本后面加一个时间戳，修改 webpack.prod.conf.js 文件。

    const version = new Date().getTime();
    new HtmlWebpackPlugin({
        filename: config.build.index,
        template: 'index.html',
        inject: true,
        hash: version,
        favicon: resolve('icon.ico'),
        title: 'vue-admin-template',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }
    })

vue-cli 里的默认配置，css 和 js 的名字都加了哈希值，所以新版本 css、js 和就旧版本的名字是不同的，不会有缓存问题。但是 index.html 放到服务器里去的时候，index.html 在服务器端可能是有缓存的，这需要在服务器配置不让缓存 index.html。

4、nginx 配置，让 index.html 不缓存。

    location = /index.html {
        add_header Cache-Control "no-cache, no-store";
    }

