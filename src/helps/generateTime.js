const localD = '2020-09-05T14:23:01.206+00:00'

const generateTime = (timestamp) => {

    var time = new Date(timestamp)

    return `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`
}

module.exports = generateTime