// eslint-disable-next-line no-extend-native
Function.prototype.myCall = function(otherThis) {
    otherThis = otherThis || global;
    let uniqueId = "f" + Math.random();
    while (otherThis.hasOwnProperty(uniqueId)) {
        uniqueId = "f" + Math.random();
    }
    otherThis[uniqueId] = this;

    const args =[];
    for (let i = 1, len = arguments.length; i < len; i++) {
        args.push(`arguments[${i}]`);
    }

    // eslint-disable-next-line no-eval
    const result = eval(`otherThis[uniqueId](${args})`);
    delete otherThis[uniqueId];
    return result;
}

// eslint-disable-next-line no-extend-native
Function.prototype.myApply = function(otherThis, params) {
    otherThis = otherThis || global;
    let uniqueId = "f" + Math.random();
    while (otherThis.hasOwnProperty(uniqueId)) {
        uniqueId = "f" + Math.random();
    }
    otherThis[uniqueId] = this;

    let result = null;
    if (!params) {  
        result = otherThis[uniqueId]();
    } else {
        const args =[];
        for (let i = 1, len = params.length; i < len; i++) {
            args.push(`params[${i}]`);
        }
        // eslint-disable-next-line no-eval
        result = eval(`otherThis[uniqueId](${args})`);

    }
    delete otherThis[uniqueId];
    return result;
}


// eslint-disable-next-line no-extend-native
Function.prototype.myBind = function(otherThis) {
    if (typeof this !== "function") {
        return null;
    }

    const targetFunction = this;
    const boundArgs = arguments.slice(1);
    return function boundFunction() {
        const targetArgs = arguments.slice(1);
        return targetFunction.apply(otherThis, boundArgs.concat(targetArgs));
    }
}