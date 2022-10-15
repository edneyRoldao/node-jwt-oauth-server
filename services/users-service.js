const bcrypt = require('bcrypt')
const moment = require('moment')
const User = require('./../models/user')
const emailService = require('./email-service')
const appEnv = require('./../configs/env-config')()
const appMessages = require('./../configs/i18n-config')()
const { copyObject } = require('./../utils/app-util')
const codeGenerator = require('./../utils/code-gen-util')
const UserActivation = require('./../models/user-activation')
const UserPasswordUpdate = require('./../models/user-password-update')
const { isObjectIdValid, isPasswordFormatValid } = require('./../utils/validators-util')


async function createUser(requestBody) {
    let user = new User()
    user.username = requestBody.username

    if (!isPasswordFormatValid(requestBody.password))
        throw new Error(appMessages.passwordError)

    user.password = await bcrypt.hash(requestBody.password, appEnv.userHashPasswordSaltOrRound)
    user.profile = _getProfileFromRequest(requestBody)

    user = await user.save()
    await sendActivationCodeToUser(user.username)

    const userResponse = copyObject(user)
    delete userResponse.password

    return userResponse
}


async function sendUpdatePasswordCode(username) {
    const user = await User.findOne({username: username})

    if (!user) return

    await UserPasswordUpdate.findOneAndRemove({email: username}).exec()

    const code = codeGenerator.generateCode()
    
    const updatePasswordCode = new UserPasswordUpdate({ email: username, code })
    await updatePasswordCode.save()
    
    const subject = appMessages.passwordUpdateSubject
    const message = appMessages.passwordUpdateMessage

    await emailService.sendMailToUser(username, code, subject, message, 'password')
}


async function sendActivationCodeToUser(username) {
    const user = await User.findOne({username: username})

    if (!user) return

    await UserActivation.findOneAndRemove({email: username}).exec()

    const code = codeGenerator.generateCode()
    
    const codeActivation = new UserActivation({ email: username, code })
    await codeActivation.save()
    
    const subject = appMessages.activationUpdateSubject
    const message = appMessages.activationUpdateMessage

    await emailService.sendMailToUser(username, code, subject, message, 'activation')
}


async function updateUserProfile(username, profile) {
    const user = await User.findOne({username: username})
    user.profile = _getProfileFromRequest(profile)
    await user.save()
}


async function clearUserProfile(username) {
    const user = await User.findOne({username: username})
    user.profile = {}
    await user.save()
}


async function clearUserProfile(username) {
    const user = await User.findOne({username: username})
    user.profile = {}
    await user.save()
}


async function deactivateUser(username) {
    const user = await User.findOne({username: username})
    user.active = false
    await user.save()
}


async function updateUserPassword(username, code, newPassword) {
    if (!isPasswordFormatValid(newPassword))
        throw new Error(appMessages.passwordFormatError)

    const passwordUpdateCode = await UserPasswordUpdate.findOne({email: username})

    const isValid = _isCodeValid(passwordUpdateCode, code, 'pass')

    if (!isValid) 
        throw new Error(appMessages.activationCodeError)

    const user = await User.findOne({username: username})
    user.password = await bcrypt.hash(newPassword, appEnv.userHashPasswordSaltOrRound)
    await user.save()

    await UserPasswordUpdate.findOneAndRemove({email: username}).exec()
}


async function activateUser(username, activationCode) {
    try {
        const userActivation = await UserActivation.findOne({email: username})
        const isValid = _isCodeValid(userActivation, activationCode)

        if (!isValid) return false

        const user = await User.findOne({username: username})
        user.active = true
        await user.save()
        
        await UserActivation.findOneAndRemove({email: username}).exec()
    
    } catch (error) {
        console.log(error.message);
        return false
    }

    return true
}


async function findUser(field) {
    const fields = 'id username active profile'

    const user = isObjectIdValid(field) ? await User.findById(field, fields) : await User.findOne({username: field}, fields)
    
    if (!user) throw new Error(appMessages.userNotFoundError)
    
    return user
}


async function removeUser(field) {
    if (isObjectIdValid(field))
        await User.findOneAndRemove({_id: field}).exec()
    else 
        await User.findOneAndRemove({username: field}).exec()
}


async function findAll(page, size, username, active, profileFilter) {
    const fields = 'id username profile'
    const _page = parseInt(page)
    const _size = parseInt(size)
    const _skip = _page * _size

    const filter = {}

    if (!!username) {
        if (username.length > 1) filter.username = {$in: username}
        else filter.username = {$regex: `.*${username}.*`}
    }

    if (active == 'false' || active == 'true') {
        filter.active = active
    }

    Object.keys(profileFilter).forEach(field => {
        if (!!profileFilter[field]) {
            filter[field] = {$regex: `.*${profileFilter[field]}.*`}
        }
    })

    const total = await User.count(filter).exec()
    
    let pages = !!total ? parseInt((total/_size)) : 0

    if (total > (pages * _size))
        pages++

    const users = await User.find(filter, fields, {skip: _skip, limit: size}).exec()

    return {
        totalItens: total,
        totalPages: pages,
        page: _page,
        size: _size,
        content: users
    }
}


function createUserErrorHandler(error, req) {
    const errorObj = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
    }

    if (error.message.includes("`username` is required") )
        errorObj['error_username'] = appMessages.emailRequiredError

    if (error.message.includes("`username` with value") )
        errorObj['error_username'] = appMessages.emailFormatError

    if (error.message.includes('username_1 dup key') )
        errorObj['error_username'] = appMessages.emailError

    if (error.message.includes('password') )
        errorObj['error_password'] = appMessages.passwordError

    return errorObj
}


module.exports = {
    createUser,
    sendUpdatePasswordCode,
    updateUserPassword,
    sendActivationCodeToUser,
    updateUserProfile,
    clearUserProfile,
    deactivateUser,
    activateUser,
    findUser,
    removeUser,
    findAll,
    createUserErrorHandler
}


function _getProfileFromRequest(requestBody) {
    const profile = copyObject(requestBody)
    delete profile.password
    delete profile.username
    return !!Object.entries(profile).length ? profile : {}
}

function _isCodeValid(codeObj, code, type = 'act') {
    if (codeObj.code != code) return false

    const now = moment(new Date())
    const date = moment(codeObj.generated)
    const duration = moment.duration(now.diff(date))

    const expiration = type == 'act' ? appEnv.activateCodeExpirationMinutes : appEnv.updatePasswordCodeExpirationMinutes

    console.log('############', expiration);

    return duration.asMinutes() < expiration
}
