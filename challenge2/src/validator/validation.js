

const validName = function (name) {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    return nameRegex.test(name)
}



const validEmail = function (email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-][a-z]{1,4}$/
    return emailRegex.test(email)
}


const validValue = function (data) {
    if (typeof (data) === undefined || typeof (data) === null) { return false }
    if (typeof (data) === "string" && data.trim().length > 0) { return true }
    if (typeof (data) === "number" && data.trim().length > 0) { return true }
}



const validPassword = function (password) {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/
    return passwordRegex.test(password)
}


module.exports = { validName, validEmail, validValue,  validPassword,  }