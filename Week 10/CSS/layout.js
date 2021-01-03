const { match } = require("assert");

function getStyle(element) {
    if (!element.style)
        element.style = {};
    
    for (const prop in element.computedStyle) {
        const p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;

        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }

        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
    }

    return element.style;
}

function layout(element) {
    if (!element.computedStyle)
        return;

    const elementStyle = getStyle(element);

    if (elementStyle.display !== "flex") //只处理flex布局
        return;    

    const item = element.children.filter(e => e.type === "element");
    items.sort(function (a, b) {
        return (a.order || 0) - (b.order || 0);
    });

    var style = elementStyle;

    ["width", "height"].forEach(size => {
        if (style[size] === "auto" || style[size] === "") {
            style[size] = null;
        }
    });

    if (!style.flexDirection || style.flexDirection === "auto")
        style.flexDirection = "row";
    if (!style.alginItems || style.alginItems === "auto")
        style.alginItems = "stretch";
    if (!style.justifyContent || style.justifyContent === "auto")
        style.justifyContent = "flex-start";
    if (!style.flexWrap || style.flexWrap === "auto")
        style.flexWrap = "nowrap";
    if (!style.aliginContent || style.aliginContent === "auto")
        style.aliginContent = "stretch";

    const mainSize, mainStart, mainEnd, mainSign, mainBase,
          crossSize, crossStart, crossEnd, crossSign, crossBase;

    if (style.flexDirection === "row") {
        mainSize = "width";
        mainStart = "left";
        mainEnd = "right";
        mainSign = +1;
        mainBase = 0;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
    }

    if (style.flexDirection === "row-reverse") { //右往左排
        mainSize = "width";
        mainStart = "right";
        mainEnd = "left";
        mainSign = -1;
        mainBase = style.width;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
    }

    if (style.flexDirection === "column") {
        mainSize = "height";
        mainStart = "top";
        mainEnd = "bottom";
        mainSign = +1;
        mainBase = 0;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
    }

    if (style.flexDirection === "column-reverse") {
        mainSize = "height";
        mainStart = "top";
        mainEnd = "bottom";
        mainSign = -1;
        mainBase = style.height;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
    }

    if (style.flexWrap === "wrap-reserve") {
        const tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    } else {
        crossBase = 0;
        crossSign - 1;
    }


    const isAutoMainSize = false;
    if (!style[mainSize]) { // 父元素没有设置主轴大小，计算主轴大小
        elementStyle[mainSize] = 0;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
            }
        }
    }
    isAutoMainSize = true;



    let flexLine = [];
    const flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize]; //剩余空间
    let crossSpace = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemStyle = getStyle(item);

        if (itemStyle[mainSize] === null)
            itemStyle[mainSize] = 0;


        if (itemStyle.flex) {
            flexLine.push(item);
        } else if (style.flexWrap === "nowrap" && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
                crossSize = Math.max(mainSpace, itemStyle[crossSize])
            
            flexLine.push(item);
        } else {
            if (itemStyle[mainSize] > style[mainSize]) 
                itemStyle[mainSize] = style[mainSize];
            
            if (mainSpace < itemStyle[mainSize]) {  // 当前行放不下了
                flexLine.mainSpace = mainSpace; // 存储主轴剩余空间，用于平均分配
                flexLine.crossSpace = crossSpace;
                flexLine = [item];
                flexLines.push(flexLines);
                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                flexLines.push(item);
            }
        }

        if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
            crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        mainSpace -= itemStyle[mainSize];
    }

    flexLine.mainSpace = mainSpace;

    if (style.flexWrap === "nowrap" || isAutoMainSize) {
        flexLine.crossSpace = (style[crossSize] !== (void 0)) ? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) {
        const scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);

            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;

            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        }
    } else {
        flexLines.forEach(function (items) {
            const mainSpace = items.mainSpace;
            let flexTotal = 0;

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const itemStyle = getStyle(item);

                if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
                    flexTotal += itemStyle.flex;
                    continue;
                }
            }

            if (flexTotal > 0) {
                let currentMain = mainBase;

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const itemStyle = getStyle(item);
    
                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }

                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                }
            } else {
                let currentMain = null;
                let step = 0;
                if (style.justifyContent === "flex-start") {
                    currentMain = mainBase;
                    step = 0;
                }
                if (style.justifyContent === "flex-end") {
                    currentMain = mainSpace * mainSign + mainBase;
                    step = 0;
                }
                if (style.justifyContent === "center") {
                    currentMain = mainSpace / 2 * mainSign + mainBase;
                    step = 0;
                }
                if (style.justifyContent === "space-between") {
                    currentMain = mainBase;
                    step = mainSpace / (items.length - 1) * mainSign;
                }
                if (style.justifyContent === "space-around") {
                    step = mainSpace / items.length * mainSign;
                    currentMain = step / 2 + mainBase;
                }

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    itemStyle[mainStart, currentMain];
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step;
                }
            }
        });
    }
}

module.exports = layout;