const { timeStamp } = require("node:console")

function response(status, message, afftdrows, data = null) {
    return {
        status,
        message,
        afftdrows,
        data,
        timeStamp: new Date().getTime()
    }
}

module.exports = {
    response
}