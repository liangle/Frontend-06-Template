###Proxy
Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

Proxy 用法：
```
let obj = {
        name: 'alan',
        id: '1'
    }

    let proxy = new Proxy(obj, {
        set(obj, prop, val) {
            console.log(obj, prop, val);
        }
    })
```


###Vue 3.0 Reactive 特性
通过 Proxy 把对象封装成可监听的对象。JavaScript 没办法获取一个函数能访问的所有变量，Reactive 和 Efeect 建立连接。
```
function effect(callback) {
        usedReactivites = [];
        callback(); //引用了reactive对象就会去注册

        //callbacks：[{obj: {prop: [callback, ...], ...}}]

        for (let reactivity of usedReactivites) {
            const obj = reactivity[0];
            const prop = reactivity[1];

            if(!callbacks.has(obj))
                callbacks.set(obj, new Map());

            const callbackObj = callbacks.get(obj);

            if(!callbackObj.has(prop))
                callbackObj.set(prop, []);

            callbackObj.get(prop).push(callback);
        }
    }
```

### Proxy 与双向绑定
1.Reactive实现从数据到DOM元素的监听；
2.JavaScript事件监听实现DOM到数据的绑定；

###使用Range实现DOM操作
Range创建：
```
let ranges = [];
    let container = document.getElementById('container');

    for (let i = 0; i < container.childNodes[0].textContent.length; i++) {
        let range = document.createRange();

        range.setStart(container.childNodes[0], i);
        range.setEnd(container.childNodes[0], i);

        // console.log(range.getBoundingClientRect());
        ranges.push(range);
    }
```
Range使用：
```
let dragable = document.getElementById('dragable');
range.insertNode(dragable); //所有的DOM操作都会把原来存在的元素移除
```
