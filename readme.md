## 介绍
- 角色路由 & 基本后台 layout & node 模拟数据及登录服务 & 环境变量
- webpack5 + react + react-router + axios + antd + styled-jsx + eslint + prettier

## 参考资料
  ### 官方文档
  - [webpack5](https://webpack.docschina.org/guides/)
  - [webpack5 命令行接口（CLI）](https://webpack.docschina.org/api/cli/#environment-options)
  - [react](https://zh-hans.reactjs.org/docs/getting-started.html)
  - [styled-jsx](https://github.com/vercel/styled-jsx)
  - [axios](https://www.axios-http.cn/)
  - [eslint 规则](http://eslint.cn/docs/rules/)
  - [babel](https://babel.docschina.org/docs/en/)
  - [express](http://expressjs.jser.us/3x_zh-cn/api.html)
  ### plugin & loader
  - [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#configuration)
  - [webpack-dev-server 配置](https://webpack.js.org/configuration/dev-server/#devserveropen)
  - [zip-webpack-plugin](https://github.com/erikdesjardins/zip-webpack-plugin)
  - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
  ### 博客
  - [webpack 搭建 react 开发环境详细步骤](https://www.cnblogs.com/xps-03/p/12421600.html)
  - [webpack5 打包图片资源](https://www.jianshu.com/p/36e972b19b28)
  - [webpack5 开发环境基本配置](https://blog.csdn.net/zhangyang10d/article/details/115001520)
  - [react 项目配置 eslint 总结](https://zhuanlan.zhihu.com/p/84329603)
  - [eslint 命令行使用](https://www.jianshu.com/p/4133063d1785)
  - [eslint + prettier 代码规范实践](https://www.jianshu.com/p/dd07cca0a48e)
  - [使用 eslint + prettier 来统一前端代码风格](https://segmentfault.com/a/1190000015315545)
  - [react-router-dom 中文文档](https://segmentfault.com/a/1190000039190541)

## 项目启动
  ```javascript
  // 前端
  - cnpm install 
  - npm start // 启动开发环境
  - npm run build // 生产环境打包
  - npm run lint // 代码格式及校验（具体可查看 .prettierrc.js .eslintrc.js 配置）
  // 启动 node 服务
  - cd node
  - cnpm install
  - npm run serve
  ```