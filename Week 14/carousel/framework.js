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

export class Component {
    constructor(type) {
        console.log("Component.constructor")
        // this.root = this.render();
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        child.mountTo(this.root);
    }

    mountTo(parent) {
        console.log('parent')
        parent.appendChild(this.root);
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