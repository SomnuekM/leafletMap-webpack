var datetimeFormat = function formatDateTime(dateTimeData) {
    let dateTime = new Date(dateTimeData);
    var fullDate = ("0" + dateTime.getDate()).slice(-2) +
        "/" + ("0" + (dateTime.getMonth() + 1)).slice(-2) +
        "/" + dateTime.getFullYear()
    var fullTime = ("0" + dateTime.getHours()).slice(-2) +
        ":" + ("0" + dateTime.getMinutes()).slice(-2) +
        ":" + ("0" + dateTime.getSeconds()).slice(-2);
    return [fullDate, fullTime];
}

module.exports = datetimeFormat;