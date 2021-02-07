const TICK = Symbol("tick") //定义外部不能访问的变量
const TICK_HANDLER = Symbol("tick-handler")
const ANIMATION = Symbol("animation")
const START_TIME = Symbol("start-time")
const PAUSE_START = Symbol("pause-start")
const PAUSE_TIME = Symbol("pause-time")

export class TimeLine {
    constructor() {
        this.state = "Inited";
        this[ANIMATION] = new Set();
        this[START_TIME] = new Map();
        this[PAUSE_TIME] = 0;
    }

    start() {
        if (this.state !== "Inited")
            return;

        this.state = "Started";
        const startTime = Date.now();

        this[TICK] = () => {
            const now = Date.now();

            for (const animation of this[ANIMATION]) {
                let t;
                
                if (this[START_TIME].get(animation) < startTime)
                    t = now - startTime - this[PAUSE_TIME] - animation.delay;
                else
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;

                if(animation.duration < t) {
                    this[ANIMATION].delete(animation);
                    t = animation.duration;
                }

                if (t > 0)
                    animation.receive(t);
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }

    pause() {
        if (this.state !== "Started")
            return;

        this.state = "Paused";
            
        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);
    }

    resume() {
        if (this.state !== "Paused")
            return;

        this.state = "Started";
        this[PAUSE_TIME] = Date.now() - this[PAUSE_START];
        this[TICK]();
    }

    reset() {
        this.pause();
        this.state = "Inited";
        this[ANIMATION] = new Set();
        this[START_TIME] = new Map();
        this[PAUSE_TIME] = 0;
        this[PAUSE_START] = 0;
        this[TICK_HANDLER] = null;
    }

    add(animation, startTime) {
        if (arguments.length < 2) {
            startTime = Date.now();
        }

        this[ANIMATION].add(animation);
        this[START_TIME].set(animation, startTime);
    }
}

export class Animation {
    constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
        timingFunction = timingFunction || (v => v)
        template = template || (v => v)

        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay;
        this.template = template;
        this.timingFunction = timingFunction;
    }

    receive(time) {
        let range = this.endValue - this.startValue;
        let progress = this.timingFunction(time / this.duration);
        this.object[this.property] = this.template(this.startValue + range * progress);
    }
}