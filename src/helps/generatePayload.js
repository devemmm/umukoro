const geneUpdatePayload = (updateObj) => {
    var validUpdate = {}

    if (updateObj.fname !== '') {
        validUpdate.fname = updateObj.fname
    }

    if (updateObj.lname !== '') {
        validUpdate.lname = updateObj.lname
    }

    if (updateObj.phone !== '') {
        validUpdate.phone = updateObj.phone
    }

    if (updateObj.phone2 !== '') {
        validUpdate.phone = updateObj.phone2
    }

    if (updateObj.address !== '') {
        validUpdate.address = updateObj.address
    }

    if (updateObj.nationality !== '') {
        validUpdate.nationality = updateObj.nationality
    }

    if (updateObj.zipcode !== '') {
        validUpdate.zipcode = updateObj.zipcode
    }


    return validUpdate
}

const generateTime = (timestamp) => {

    var time = new Date(timestamp)

    return `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`
}


module.exports = { geneUpdatePayload, generateTime }