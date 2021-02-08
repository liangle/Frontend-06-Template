export class Dispatcher {
    constructor(element) {
        this.element = element;
    }

    dispatch(type, properties) {
        let event = new Event(type);
        for (const name in properties) {
            event[name] = properties[name];
        }
        this.element.dispatchEvent(event);
    }
}

export class Listener {
    constructor(element, recognizer) {

        let isListeningMouse = false;
        let mousedownButtons;
        const contexts = new Map();
        
        element.addEventListener("mousedown", event => {
            if (isListeningMouse)
                return;
        
            let context = Object.create(null);
            mousedownButtons = event.buttons;

            contexts.set("mouse" + mousedownButtons, context);
            recognizer.start(event, context);
        
            const mousemove = (event) => {
                let context = contexts.get("mouse" + mousedownButtons);
                recognizer.move(event, context);
            }
        
            const mouseup = (event) => {
                let context = contexts.get("mouse" + mousedownButtons);
                recognizer.end(event, context);
                contexts.delete("mouse" + mousedownButtons);
        
                document.removeEventListener("mousemove", mousemove);
                document.removeEventListener("mouseup", mouseup);
                isListeningMouse = false;
            }
        
            if (!isListeningMouse) {
                element.addEventListener("mousemove", mousemove);
                element.addEventListener("mouseup", mouseup);
                isListeningMouse = true;
            }
        });


        element.addEventListener("touchstart", event => {
            for (const touch of event.changedTouches) {
                const context = Object.create(null);
                contexts.set(touch.identifier, context);
                recognizer.start(touch, context);
            }
        })

        element.addEventListener("touchmove", event => {
            for (const touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.move(touch, context);
            }
        })

        element.addEventListener("touchend", event => {
            for (const touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.end(touch, context);
                contexts.delete(touch.identifier);
            }
        })

        element.addEventListener("touchcancel", event => {
            for (const touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.cancel(touch, context);
                contexts.delete(touch.identifier);
            }
        })
    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    start(point, context) {
        context.startX = point.clientX, context.startY = point.clientY;
        context.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        }];
    
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
    
        context.handler = setTimeout(() => {
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            context.handler = null;
            this.dispatcher.dispatch("press", {});
        }, 500);
    }
    
    move(point, context) {
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            context.isVertical = Math.abs(dx) - Math.abs(dy)
            this.dispatcher.dispatch("prePanStartss", {
                startX : context.startX,
                startY : context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            });
        }
    
        if (context.isPan) {
            this.dispatcher.dispatch("pan", {
                startX : context.startX,
                startY : context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            });
            clearTimeout(context.handler);
        }
    
        context.points = context.points.filter(point => Date.now() - point.t < 500);
    
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        });
    }

    end(point, context) {
        if (context.isTap) {
            this.dispatcher.dispatch("tap", {})
            clearTimeout(context.handler);
        }
        if (context.isPress) {
            console.log("pressed")
        }
    
        let d, v;
        if (context.points.length === 0) {
            v = 0;
        } else {
            context.points = context.points.filter(point => Date.now() - point.t < 500);
            d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2);
            v = d / (Date.now() - context.points[0].t);
        }
    
        if (v > 1.5) {
            context.isFlick = true;
            this.dispatcher.dispatch("flickanned", {
                startX : context.startX,
                startY : context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick,
                velocity: v
            });
        } else {
            context.isFlick = false;
        }

        if (context.isPan) {
            this.dispatcher.dispatch("panned", {
                startX : context.startX,
                startY : context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick
            });
        }
    }

    cancel(point, context) {
        clearTimeout(context.handler);
        this.dispatcher.dispatch("cancel", {});
    }
}

export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatcher(element)));
}