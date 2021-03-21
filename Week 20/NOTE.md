## 持续集成


#### 一、发布前检查
1. daily build，通过服务端代码每天build，没build成功时可以检测日志排查问题；
2. BVT（build verification test），构建时的验证测试，也是一种冒烟测试，一般由测试工程师提供；
3. PhantomJS，利用无头浏览器把DOM树生成后检测DOM树的格式，譬如CSSOM拿位置信息，根据一些规则判断是否正确；

#### 二、Git Hooks基本用法
Git Hooks 默认在仓库里，查看隐藏的文件
```
ls -a
```

打开.git文件夹
```
open ./.git 
```

查看文件权限
```
ls -l ./pre-commit
```

给文件添加执行权限

```
chmod +x ./pre-commit
```

删除文件

```
rm ./.DS_store
```

阻止提交
```
let process = require("process");
process.exitCode = 1
```

#### 三、ESLint基本用法
安装
```
$ npm i --save-dev eslint
$ npx eslint --init
```
检查
```
npx eslint ./index.js
```
#### 四、ESLint API及其高级用法

```
const { ESLint } = require("eslint");

(async function main() {
  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint({ fix: true });

  // 2. Lint files. This doesn't modify target files.
  const results = await eslint.lintFiles(["lib/**/*.js"]);

  // 3. Modify the files with the fixed code.
  await ESLint.outputFixes(results);

  // 4. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 5. Output it.
  console.log(resultText);
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
```

当Git add后再修改文件，如果修改前能校验通过，修改后不能通过，git hook会检验修改后的文件，导致commit不成功。

解决办法：修改pre-commit，lint前先隐藏修改
```
await exec("git stash push -k");
const results = await eslint.lintFiles(["index.js"]);
await exec("git stash pop");
```

#### 五、使用无头浏览器检查DOM
1. headless-chrome
2. puppeteer

安装
```
$ npm i --save-dev puppeteer
```

使用
```
const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto("http://localhost:8080/main.html");

    const a = await page.$("a");
    console.log(await a.asElement().boxModel());
})();
```