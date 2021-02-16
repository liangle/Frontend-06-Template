import { Component } from "./framework.js"
import { enableGesture } from "./gesture.js"
import { TimeLine, Animation } from "./animation.js"
import { ease } from "./ease.js"

export class Carousel extends Component {
    constructor() {
        // console.log("Carousel.constructor")
        super();
        this.attributes = Object.create(null);
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    render() {
        this.root = document.createElement("div")
        this.root.classList.add("carousel");

        for (const record of this.attributes.src) {
            const child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        enableGesture(this.root);
        let timeline = new TimeLine();
        timeline.start();

        let children = this.root.children;
        let position = 0;

        let t = 0;
        let ax = 0;

        let handler = null;

        this.root.addEventListener("start", event => {
            timeline.pause();
            clearInterval(handler);
            let progress = (Date.now() - t) / 1500;
            ax = ease(progress) * 500 - 500;
        });

        this.root.addEventListener("pan", event => {
            let x = event.clientX - event.startX - ax;
            let current = position - ((x - x % 500) / 500);

            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;

                children[pos].style.transition = "none";
                children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x}px)`;
            }
        });

        this.root.addEventListener("end", event => {
            timeline.reset();
            timeline.start();
            handler = setInterval(nextPicture, 3000);

            let x = event.clientX - event.startX - 0;
            let current = position - ((x - x % 500) / 500);
            let direction = Math.round((x % 500) / 500);

            if (event.isFlick) {
                if (event.clientX > event.startX) {
                    direction = Math.ceil((x % 500) / 500); // 右滑：1
                } else {
                    direction = Math.floor((x % 500) / 500); // 左滑：-1
                }
            }

            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;

                children[pos].style.transition = "none";
                timeline.add(new Animation(children[pos].style, "transform", 
                    - pos * 500 + offset * 500 + x % 500, 
                    - pos * 500 + offset * 500 + x % 500 + direction * 500,
                    1500, 0, ease, v => `translateX(${v}px)`));
            }

            position = position - ((x - x % 500) / 500) - direction;
            position = (position % children.length + children.length) % children.length;
        });

        let nextPicture = ()=> {
            let children = this.root.children;
            let nextIndex = (position + 1) % children.length;
            
            let current = children[position];
            let next = children[nextIndex];

            t = Date.now();

            timeline.add(new Animation(current.style, "transform", 
                - position * 500, -500 -position * 500, 1500, 0, ease, v => `translateX(${v}px)`));
            timeline.add(new Animation(next.style, "transform", 
                500 - nextIndex * 500, -nextIndex * 500, 1500, 0, ease, v => `translateX(${v}px)`));
            
            position = nextIndex;
        }

        handler = setInterval(nextPicture, 3000);

        /*
        this.root.addEventListener("mousedown", event => {
            let children = this.root.children;
            let startX = event.clientX;
            
            let move = event => {
                let x = event.clientX - startX;
                let current = position - ((x - x % 500) / 500);

                for (let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x}px)`;
                }
            }

            let up = event => {
                let x = event.clientX - startX;
                position = position - Math.round(x / 500);
                // console.log(position)
                const nearOffset = -Math.sign(- x + 250 * Math.sign(x));

                for (let offset of [0, nearOffset]) {
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;
                    
                    if (offset === 0) {
                        position = pos
                    }

                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`;
                }

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            }

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        });

        let currentIndex = 0;
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;
            
            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = "none";
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`

            setTimeout(() => {
                next.style.transition = "";
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)` // 从可视区移走
                next.style.transform = `translateX(${-nextIndex*100}%)` // 移到可视区
                currentIndex = nextIndex;
            }, 16);
        }, 3000); */

        return this.root;
    }

    mountTo(parent) {
        parent.appendChild(this.render());
    }
}