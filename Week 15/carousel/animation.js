const TICK = Symbol("tick") //定义外部不能访问的变量
const TICK_HANDLER = Symbol("tick_handler")
const ANIMATION = Symbol("animation")

export class TimeLine {
    constructor() {
        this[ANIMATION] = new Set();
    }

    start() {
        const startTime = Date.now();
        this[TICK] = () => {
            const t = Date.now() - startTime;

            for (const animation of this[ANIMATION]) {
                let t0 = t;

                if(animation.duration < t) {
                    this[ANIMATION].delete(animation);
                    t0 = animation.duration;
                }
                animation.receive(t0);
            }
            requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }

    pause() {

    }

    resume() {

    }

    add(animation) {
        this[ANIMATION].add(animation);
    }
}

export class Animation {
    constructor(object, property, startValue, endValue, duration, timingFunction) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.timingFunction = timingFunction;
    }

    receive(time) {
        let range = this.endValue - this.startValue 
        this.object[this.property] = this.startValue + range * time / this.duration;
    }
}