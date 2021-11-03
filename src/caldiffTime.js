var diffTime = function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    // calculate seconds
    var seconds = diffInMilliSeconds % 60;

    let difference = '';
    var color = '',
        Min = ``;
    if (minutes >= 2) {
        color = '#FF0000';
        Min = `<b style='color:` + color + `;'>${minutes} M ${seconds} S</b>`
    } else {
        Min = `<span style='color:#000000;'>${minutes} M ${seconds} S</span>`
    }
    difference += (minutes === 0) ? `<span>${seconds} S</span>` : Min;

    return difference;
}

module.exports = diffTime;