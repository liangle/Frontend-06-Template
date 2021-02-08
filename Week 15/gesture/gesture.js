
const element = document.documentElement;

const contexts = new Map();
let isListeningMouse = false;
let mousedownButtons;

document.addEventListener("mousedown", event => {
    if (isListeningMouse)
        return;

    let context = Object.create(null);
    mousedownButtons = event.buttons;
    contexts.set("mouse" + mousedownButtons, context);
    start(event, context);

    const mousemove = (event) => {
        let context = contexts.get("mouse" + mousedownButtons);
        move(event, context);
    }

    const mouseup = (event) => {
        let context = contexts.get("mouse" + mousedownButtons);
        end(event, context);
        contexts.delete("mouse" + mousedownButtons);

        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
        isListeningMouse = false;
    }

    if (!isListeningMouse) {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        isListeningMouse = true;
    }
});

document.addEventListener("touchstart", event => {
    for (const touch of event.changedTouches) {
        const context = Object.create(null);
        contexts.set(touch.identifier, context);
        start(touch, context);
    }
})

document.addEventListener("touchmove", event => {
    for (const touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        move(touch, context);
    }
})

document.addEventListener("touchend", event => {
    for (const touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        end(touch, context);
        contexts.delete(touch.identifier);
    }
})

document.addEventListener("touchcancel", event => {
    for (const touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        cancel(touch, context);
        contexts.delete(touch.identifier);
    }
})

let handler;
let startX, startY;
let isTap = false, isPan = true, isPress = false;

let start = (point, context) => {
    context.startX = point.clientX, context.startY = point.clientY;

    context.isTap = true;
    context.isPan = false;
    context.isPress = false;

    console.log(context)
    context.handler = setTimeout(() => {
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        context.handler = null;
        console.log("press")
    }, 500);
}

let move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        console.log("PanStart")
    }

    if (context.isPan) {
        console.log("Pan")
        clearTimeout(context.handler);
    }
    // console.log("move", point.clientX, point.clientY);
}

let end = (point, context) => {
    console.log(context)
    if (context.isTap) {
        clearTimeout(context.handler);
        dispatch("tap", {})
        console.log("tap")
    }
    if (context.isPan) {
        console.log("panned")
    }
    if (context.isPress) {
        console.log("pressed")
    }
    console.log("end", point.clientX, point.clientY);
}

let cancel = (point, context) => {
    clearTimeout(context.handler);
    // console.log("cancel", point.clientX, point.clientY);
}

function dispatch(type, properties) {
    let event = new Event(type);
    for (const name in properties) {
        event[name] = properties[name];
    }
    element.dispatchEvent(event);
}