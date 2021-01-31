
### 组件

1. Properties：使用组件的人向开发的人传递信息
2. Methods
3. Inherit
4. Attribute：使用组件的人向开发的人传递信息
5. Config & State：用户输入改变State。Config不可改变
6. Event：开发人员向使用者传递信息
7. Lifecycle：创建 -> 销毁
8. Children：树形结构的必要条件

> 组件在对象的基础上增加很多特性，使得组件非常适合描述UI。

### JSX环境搭建

```
mkdir jsx
npm init
npm install -g webpack webpack-cli
webpack --version
npm install -save-dev webpack babel-loader
npm install -save-dev @babel/core @babel/preset-env

//调试工具
npm install webpack-dev-server

使用时提示 Cannot find module 'webpack-cli/bin/config-yargs'，删除node_modules重新安装到全局后可以用
```
