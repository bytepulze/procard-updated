let snowflakes = [];
let browserWidth;
let browserHeight;
let numberOfSnowflakes = 50;
let resetPosition = false;
let enableAnimations = false;
let reduceMotionQuery = matchMedia("(prefers-reduced-motion)");
function setAccessibilityState() {
    if (reduceMotionQuery.matches) {
        enableAnimations = false;
    } else {
        enableAnimations = true;
    }
}
setAccessibilityState();
reduceMotionQuery.addListener(setAccessibilityState);
function setup() {
    if (enableAnimations) {
        window.addEventListener("DOMContentLoaded", generateSnowflakes, false);
        window.addEventListener("resize", setResetFlag, false);
    }
}
setup();
class Snowflake {
    constructor(element, speed, xPos, yPos) {
        this.element = element;
        this.speed = speed;
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = 1;
        this.counter = 0;
        this.sign = Math.random() < 0.5 ? 1 : -1;
        this.element.style.opacity = (0.4 + Math.random()) / 3;
    }
    update(delta) {
        this.counter += (this.speed / 5000) * delta;
        this.xPos += (this.sign * delta * this.speed * Math.cos(this.counter)) / 40;
        this.yPos += Math.sin(this.counter) / 40 + (this.speed * delta) / 30;
        this.scale = 0.5 + Math.abs((10 * Math.cos(this.counter)) / 20);
        setTransform(Math.round(this.xPos), Math.round(this.yPos), this.scale, this.element);
        if (this.yPos > browserHeight) {
            this.yPos = -50;
        }
    }
}
function setTransform(xPos, yPos, scale, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
}
function generateSnowflakes() {
    let originalSnowflake = document.querySelector(".snowflake");
    let snowflakeContainer = originalSnowflake.parentNode;
    snowflakeContainer.style.display = "block";
    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;
    for (let i = 0; i < numberOfSnowflakes; i++) {
        let snowflakeClone = originalSnowflake.cloneNode(true);
        snowflakeContainer.appendChild(snowflakeClone);
        let initialXPos = getPosition(50, browserWidth);
        let initialYPos = getPosition(50, browserHeight);
        let speed = (5 + Math.random() * 40) * delta;
        let snowflakeObject = new Snowflake(snowflakeClone,speed,initialXPos,initialYPos);
        snowflakes.push(snowflakeObject);
    }
    snowflakeContainer.removeChild(originalSnowflake);
    requestAnimationFrame(moveSnowflakes);
}
let frames_per_second = 60;
let frame_interval = 1000 / frames_per_second;
let previousTime = performance.now();
let delta = 1;
function moveSnowflakes(currentTime) {
    delta = (currentTime - previousTime) / frame_interval;
    if (enableAnimations) {
        for (let i = 0; i < snowflakes.length; i++) {
            let snowflake = snowflakes[i];
            snowflake.update(delta);
        }
    }
    previousTime = currentTime;
    if (resetPosition) {
        browserWidth = document.documentElement.clientWidth;
        browserHeight = document.documentElement.clientHeight;
        for (let i = 0; i < snowflakes.length; i++) {
            let snowflake = snowflakes[i];
            snowflake.xPos = getPosition(50, browserWidth);
            snowflake.yPos = getPosition(50, browserHeight);
        }
        resetPosition = false;
    }
    requestAnimationFrame(moveSnowflakes);
}
function getPosition(offset, size) {
    return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}
function setResetFlag(e) {
    resetPosition = true;
}
