const appEnv = require('./../configs/env-config')()

function isObjectIdValid(id) {
    return id.match(/^[0-9a-fA-F]{24}$/)
}

function isPasswordFormatValid(password) {
    if (!appEnv.validateUserPasswordFormatRegex) return true
    return appEnv.validateUserPasswordFormatRegex.test(password)
}

module.exports = {
    isObjectIdValid,
    isPasswordFormatValid
}
