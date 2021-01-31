
// createElement 方法打包后的代码，第二个参数是attribute，第三个参数是child
// var a = createElement("div", {
//     id: "a"
//   }, 
//   createElement("span", null));

function createElement(type, attibutes, ...children) {
    let element;
    if (typeof type === "string")
        element = new ElementWrapper;
    else
        element = new type;

    for (const name in attibutes) {
        element.setAttribute(name, attibutes[name]);
    }

    for (const child of children) {
        if (typeof child === "string") {
            child = new TextWrapper(child);
        }
        element.appendChild(child);
    }
    return element;
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        child.mountTo(this.root);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        child.mountTo(this.root);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class Div {
    constructor(type) {
        this.root = document.createElement("div")
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        child.mountTo(this.root);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

let a = <div id="a">
    Hello World!
</div>

a.mountTo(document.body)