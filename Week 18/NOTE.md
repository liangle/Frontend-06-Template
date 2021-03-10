通常可以对关键代码做测试，业务代码一般不做，代价比较高。流行的测试框架有Mocha，mochajs.org，还有一个叫Jest

**一、Mocha**

1. 安装
```
$ npm i -g mocha
$ npm i --save-dev mocha
```

2. 使用

```
var assert = require('assert');

import { add } from '../add.js'

describe('add function testing', function() {
    it('1 + 2 should be 3', function() {
        assert.equal(add(1, 2), 3);
    });
    
    it('-5 + 2 should be -3', function() {
        assert.equal(add(-5, 2), -3);
    });
})
```

**二、export 的两种方法：**

1. module.exports
```
module.exports.add = add

var add require('../add.js').add
```
2. export，export 在 nodejs 里默认不能用，需要把 package.json 的 type 改成 mdoule，或者用 babel 来做，改成 module 比较多，一般用 babel。
```
export function add() {
    ...
}

import { add } require('../add.js')
```

3. 用 babel 的 register 解决 export问题

```
$ npm i --save-dev @babel/core @babel/register @babel/preset-env

/* 使用前添加 .babelrc */
{
    "presets": ["@babel/preset-env"]
}

$ ./node_modules/.bin/mocha --require @babel/register
```

**三、code coverage**

code coverage：单元测试代码覆盖率，工具 nyc ,babel 和 nyc 相互加插件

```
$ cnpm i --save-dev nyc
$ nyc ./node_modules/.bin/mocha --require @babel/register
```



**babel-plugin-istanbul** 

1. 安装

```
$ npm i --save-dev babel-plugin-istanbul
```
2. 配置 .babelrc

```
{
    "presets": ["@babel/preset-env"],
    "plugins": ["istanbul"]
}
```


**@istanbuljs/nyc-config-babel** 
1. 安装
```
$ npm i --save-dev @istanbuljs/nyc-config-babel
```

2. 配置 .nycrc

```
{
    "extends": "@istanbuljs/nyc-config-babel"
}
```
