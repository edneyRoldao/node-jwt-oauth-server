const moment = require('moment')
const User = require('./../models/user')
const schedule = require('node-schedule')
const appEnv = require('./../configs/env-config')()
const UserActivation = require('./../models/user-activation')
const UserPasswordUpdate = require('./../models/user-password-update')
const { removeTokenFromRevokedList, getRevokedList } = require('./../services/jwt-service')


async function purgeMongoData() {
    console.log('purge app data has been called - date: ', new Date());
    _purgeActivationCodes()
    _purgeDeactivatedUsers()
    _purgeChangePasswordCode()
    _purgeRevokedTokenList()
}


module.exports = async () => {
    purgeMongoData()
    const job = schedule.scheduleJob(appEnv.purgeMongoDataCron, purgeMongoData)
}


async function _purgeDeactivatedUsers() {
    const users = await User.find({active: false}).exec()

    const usersRemove = users.filter(user => {
        const now = moment(new Date())
        const created = moment(user.created)
        const duration = moment.duration(now.diff(created))
        return duration.asMinutes() > appEnv.dataToBePurgedAfterMinutes && (!user.profile || !Object.keys(user.profile).length)
    }).map(user => user._id)

    await User.findOneAndRemove({_id: {$in: usersRemove}}).exec()
}


async function _purgeActivationCodes() {
    const activationCodes = await UserActivation.find().exec()

    const codesAfterOneDay = activationCodes.filter(code => {
        const now = moment(new Date())
        const activationDate = moment(code.generated)
        const duration = moment.duration(now.diff(activationDate))
        return duration.asMinutes() > appEnv.dataToBePurgedAfterMinutes
    }).map(code => code._id)

    await UserActivation.findOneAndRemove({_id: {$in: codesAfterOneDay}}).exec()
}

async function _purgeChangePasswordCode() {
    const passwordCode = await UserPasswordUpdate.find().exec()

    const codesToRemove = passwordCode.filter(code => {
        const now = moment(new Date())
        const codeGenDate = moment(code.generated)
        const duration = moment.duration(now.diff(codeGenDate))
        return duration.asMinutes() > appEnv.updatePasswordCodeExpirationMinutes
    }).map(code => code._id)

    await UserPasswordUpdate.findOneAndRemove({_id: {$in: codesToRemove}}).exec()
}

function _purgeRevokedTokenList() {
    const now = moment(new Date())

    getRevokedList().forEach(token => {
        const date = moment(token.created)
        const duration = moment.duration(now.diff(date))

        if (duration.asMinutes() > appEnv.dataToBePurgedAfterMinutes) 
            removeTokenFromRevokedList(token)
    })
}
 