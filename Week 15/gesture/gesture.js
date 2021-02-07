
const element = document.documentElement;

element.addEventListener("mousedown", event => {
    start(event);
    const mousemove = event => {
        move(event);
    }

    const mouseup = () => {
        end(event);
        element.removeEventListener("mousemove", mousemove);
        element.removeEventListener("mouseup", mouseup);
    }

    element.addEventListener("mousemove", mousemove);
    element.addEventListener("mouseup", mouseup);
});

element.addEventListener("touchstart", event => {
    for (const touch of event.changedTouches) {
        start(touch);
    }
})

element.addEventListener("touchmove", event => {
    for (const touch of event.changedTouches) {
        move(touch);
    }
})

element.addEventListener("touchend", event => {
    for (const touch of event.changedTouches) {
        end(touch);
    }
})

element.addEventListener("touchcancel", event => {
    for (const touch of event.changedTouches) {
        cancel(touch);
    }
})

let handler;
let startX, startY;
let isPan = false, isTap = true, isPress = false;

let start = point => {
    startX = point.clientX, startY = point.clientY;

    isTap = true;
    isPan = false;
    isPress = false;

    handler = setTimeout(() => {
        isTap = false;
        isPan = false;
        isPress = true;
        handler = null;
        console.log("press")
    }, 500);
}

let move = point => {
    let dx = point.clientX - startX, dy = point.clientY - startY;
    if (!isPan && dx ** 2 + dy ** 2 > 100) {
        isTap = false;
        isPan = true;
        isPress = false;
        console.log("PanStart")
    }

    if (isPan) {
        console.log("Pan")
        clearTimeout(handler);
    }
    // console.log("move", point.clientX, point.clientY);
}

let end = point => {
    if (isTap) {
        clearTimeout(handler);
        console.log("tap")
    }
    if (isPan) {
        console.log("panned")
    }
    if (isPress) {
        console.log("pressed")
    }
    console.log("end", point.clientX, point.clientY);
}

let cancel = point => {
    clearTimeout(handler);
    // console.log("cancel", point.clientX, point.clientY);
}