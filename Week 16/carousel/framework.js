export function createElement(type, attibutes, ...children) {
    let element;
    if (typeof type === "string")
        element = new ElementWrapper(type);
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

export const STATE = Symbol("state"); //成员变量
export const ATTRIBUTE = Symbol("attribute"); //成员变量

export class Component {
    constructor(type) {
        console.log("Component.constructor")
        this[ATTRIBUTE] = Object.create(null);
        this[STATE] = Object.create(null);
    }

    setAttribute(name, value) {
        this[ATTRIBUTE][name] = value;
    }

    appendChild(child) {
        child.mountTo(this.root);
    }

    mountTo(parent) {
        if (!this.root) {
            this.render();
        }
        parent.appendChild(this.root);
    }

    triggerEvent(type, args) {
        this[ATTRIBUTE]["on" + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, {detail: args}));
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        super(type);
        this.root = document.createElement(type)
    }
}

class TextWrapper extends Component {
    constructor(content) {
        super(type);
        this.root = document.createTextNode(content)
    }
}