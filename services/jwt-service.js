const util = require('util')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../models/user')
const appEnv = require('./../configs/env-config')()
const appMessages = require('./../configs/i18n-config')()
const { removeUserPassword } = require('./../utils/app-util')


let revokedTokenList = []
const jwtVerify = util.promisify(jwt.verify)


async function verify(token) {
    try {
        if (revokedTokenList.some(el => el.token == token))
            return null

        return await jwtVerify(token, appEnv.accessTokenSecret)

    } catch (err) {
        return null
    }
}


async function generate(request) {
    if (!request.body || !request.body.username || !request.body.password)
        throw new Error(appMessages.badCredentials)

    const username = request.body.username
    const password = request.body.password

    const user = await User.findOne({username: username})

    if (!user || !(await bcrypt.compare(password, user.password)))
        throw new Error(appMessages.badCredentials)

    if (!user.active)
        throw new Error(appMessages.userNotActive)

    const userClaims = removeUserPassword(user)
    const expiresIn = appEnv.expirationTokenInMinutes + 'm'

    return jwt.sign(userClaims, appEnv.accessTokenSecret, {expiresIn})
}


function revokeToken(token) {
    revokedTokenList.push({ token: token, created: new Date() })
}

function removeTokenFromRevokedList(token) {
    revokedTokenList = revokedTokenList.filter(el => el.token != token)
}

function getRevokedList() {
    return revokedTokenList
}

module.exports = {
    verify,
    generate,
    revokeToken,
    removeTokenFromRevokedList,
    getRevokedList
}
