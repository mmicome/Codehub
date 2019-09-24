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

问题背景a.浏览器端在每次发布新的版本时候，总会出现因为单页面项目中index.html文件`（200 ok from disk cache )`不发送请求，直接取用了本地磁盘缓存,和服务端版本不一致的问题，导致用户不能及时更新，需要通过手动刷新来强制从服务端更新文件。
