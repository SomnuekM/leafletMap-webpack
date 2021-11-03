var speedCatch = function speedCatch(data, floor) {

    var newData = [];
    var arr = [];
    data.forEach((dat, index, old) => {

        if (dat.speed > floor) {
            arr.push(dat);
            if (index + 1 == old.length && arr) newData.push(arr);
        } else {
            if (arr.length > 0) newData.push(arr);
            arr = [];
        }
    });
    return newData;
}

module.exports = speedCatch;