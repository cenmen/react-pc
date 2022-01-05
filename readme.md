## 参考资料
  ### 官方文档
  - [webpack5](https://webpack.docschina.org/guides/)
  - [webpack5 命令行接口（CLI）](https://webpack.docschina.org/api/cli/#environment-options)
  - [styled-jsx](https://github.com/vercel/styled-jsx)
  - [react](https://zh-hans.reactjs.org/docs/getting-started.html)
  - [eslint 规则](http://eslint.cn/docs/rules/)
  - [babel](https://babel.docschina.org/docs/en/)
  - [axios] (https://www.axios-http.cn/)
  - [express] (http://expressjs.jser.us/3x_zh-cn/api.html)
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

## 项目介绍
  1. 新建文件夹后在文件下初始化项目
  ```javascript
  npm init
  ```
  2. 安装项目所需依赖
  ```javascript
  // 项目框架所需依赖
  cnpm install --save react react-dom // react 
  cnpm install --save axios styled-jsx // 网络请求 样式方案
  cnpm install --save antd react-router-dom // 组件库 路由导航
  ```
  ```javascript
  // 打包依赖
  cnpm install --save-dev webpack webpack-cli
  cnpm install --save-dev style-loader css-loader // 这里主要是使用的 antd 需要
  cnpm install --save-dev @babel/core @babel/preset-env @babel/preset-react
  cnpm install --save-dev babel-loader
  cnpm install --save-dev html-webpack-plugin webpack-dev-server
  ```
  3. 新建文件目录及文件
  ```javascript
  /dist // 项目打包输出
  /src // 开发主目录
  webpack.config.js // 生产环境打包配置
  webpack.dev.config.js // 开发环境配置
  /src/app.js // 依赖入口(webpack.config.js 配置从 app.js 开始解析项目文件依赖)
  template.html // html-webpack-plugin 需要
  ```
  4. 使用 eslint + prettier 来统一前端代码风格
  ```javascript
  // 代码格式和校验
  cnpm install --save-dev eslint babel-eslint eslint-plugin-react
  cnpm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
  ```

## 项目启动
  ```javascript
  - cnpm install 
  - npm start // 启动开发环境
  - npm run build // 生产环境打包
  - npm run lint // 代码格式及校验（具体可查看 .prettierrc.js .eslintrc.js 配置）
  ```

## 备注
package.json homepage 被设置为 "."，方便本地调试，部署到服务记得修改