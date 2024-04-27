function animate(obj, target, callback) {
    obj.timer = setInterval(() => {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft >= target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30);
}