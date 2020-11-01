#学习笔记（Week 01）
###1. 异步编程
异步编程有三种方式：callback、Promise、asycn/await，其中asycn/await基于Promise的封装，asycn/await 配对使用；
asycn/await例子：

```
    function sleep(t) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {resolve()}, t);
        })
    }

    asycn function go() {
    	await sleep(1000);
    }
```

###2. 函数提升
Javascript 中函数声明和函数表达式是存在区别的，函数声明在JS解析时进行函数提升，因此在同一个作用域内，不管函数声明在哪里定义，该函数都可以进行调用。而函数表达式的值是在JS运行时确定，并且在表达式赋值完成后，该函数才能调用。
```
    var sayHello;
    console.log(typeof sayHey); //=>function
    console.log(typeof sayHello ); //=>undefined

    function sayHey() {
        console.log("sayHey");
    }
    sayHello = function sayHo() {
        console.log("sayHello");
    };

    function sayHey() {
        console.log("sayHey2");
    }
    sayHello = function sayHo() {
        console.log("sayHello2");
    };

    sayHey(); // => sayHey2
    sayHello(); // => sayHello2 
```

###3. 小知识
1. line-height：设置 div 的 line-height 等于 div 的高度可以实现文字垂直居中；
2. font-size：通过 `display: inline-block` 设置多个 div 在同一行时，div 之间会出现间距， 设置 `font-size:0` 可以去掉 div 之间的空格；

###4. 查找资料
+ https://whatwg.org/
+ https://www.w3.org/TR/
+ https://developer.mozilla.org/
