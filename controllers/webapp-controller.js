const appEnv = require('./../configs/env-config')()
const appMessages = require('./../configs/i18n-config')()
const jwtService = require('./../services/jwt-service')
const userService = require('./../services/users-service')

function WebappController() {}

// ejs pages
const loginPage = 'login'
const createUserPage = 'create-user'
const errorMessagePage = 'error-message'
const successMessagePage = 'success-message'
const userNewPasswordPage = 'user-new-password'
const updateUserPasswordPage = 'update-user-password'
const activateUserAccountPage = 'activate-user-account'


WebappController.prototype.getLoginPage = (req, res) => {
    return res.render(loginPage, { username: '', password: '', page: appMessages.loginPage })
}

WebappController.prototype.getCreateUserPage = (req, res) => {
    return res.render(createUserPage, { name: '', username: '', password: '', page: appMessages.createUserPage })
}

WebappController.prototype.getUpdateUserPasswordPage = (req, res) => {
    return res.render(updateUserPasswordPage, {page: appMessages.updateUserPasswordPage})
}

WebappController.prototype.getActivateUserPage = (req, res) => {
    const code  = req.query.code
    const username = req.query.username
    return res.render(activateUserAccountPage, {code, username, page: appMessages.activateUserAccountPage})    
}

WebappController.prototype.getUserNewPasswordPage = (req, res) => {
    const username = req.query.username
    const activationCode  = req.query.code

    return res.render(userNewPasswordPage, {
        username: username,
        code: activationCode,
        password: '',
        page: appMessages.userNewPasswordPage
    })    
}

WebappController.prototype.getActivateUserAccountPage = async (req, res) => {
    const username = req.query.username
    const message = appMessages.activationAccountEmail
    
    try {
        await userService.sendActivationCodeToUser(username)        
    } catch (error) {
    }

    return res.render(activateUserAccountPage, { code: '', username, message, page: appMessages.activateUserAccountPage})    
}


WebappController.prototype.activateUser = async (req, res) => {
    const code  = req.body.code || ''
    const username = req.body.username || ''

    const result = await userService.activateUser(username, code)

    if (result) {
        const message = appMessages.userActive        
        return res.render(successMessagePage, {title: 'Confirmed', message, textLink: appMessages.successPageTextLink})    

    } else {
        return res.render(activateUserAccountPage, {
            code, 
            username, 
            message: appMessages.activationCodeInvalid, 
            page: appMessages.activateUserAccountPage
        })
    }
}


WebappController.prototype.login = async (req, res) => {
    try {
        const accessToken = await jwtService.generate(req)
        res.header('Authorization', `Bearer ${accessToken}`)
        res.redirect(appEnv.redirectUrlAfterLogin)

    } catch (error) {
        const errorObj = {
            username: req.body.username,
            password: req.body.password,
        }

        if (error.message.includes(appMessages.userNotActive))
            errorObj.notActiveMessage = `${error.message} - `
        else
            errorObj.errorCredentials = appMessages.invalidCredentials
        
        errorObj.page = appMessages.loginPage

        return res.render(loginPage, errorObj)              
    }    
}


WebappController.prototype.createUser =  async (req, res) => {
    try {
        await userService.createUser(req.body)

    } catch (error) {
        const errorObj = userService.createUserErrorHandler(error, req)

        errorObj.page = appMessages.createUserPage

        return res.render(createUserPage, errorObj)         
    }

    return res.render(successMessagePage, {
        title: appMessages.success,
        message: appMessages.userCreationSuccess,
        textLink: appMessages.successPageTextLink
    })
}


WebappController.prototype.updateUserPassword = async (req, res) => {
    await userService.sendUpdatePasswordCode(req.body.username)

    return res.render(successMessagePage, {
        title: appMessages.success,
        message: appMessages.updatePasswordEmail,
        textLink: appMessages.successPageTextLink
    })
}


WebappController.prototype.newPassword = async (req, res) => {
    const code  = req.body.code
    const password = req.body.password
    const username = req.body.username

    try {
        await userService.updateUserPassword(username, code, password)
            
    } catch (error) {
        if (error.message.includes(appMessages.passwordFormatError)) {
            return res.render(userNewPasswordPage, {
                code,
                password,
                username,
                error_password: error.message,
                page: appMessages.userNewPasswordPage
            })                
        }

        return res.render(errorMessagePage, {
            title: appMessages.error,
            message: appMessages.passwordCodeExpiration,
            textLink: appMessages.successPageTextLink
        })    
    }

    return res.render(successMessagePage, {
        title: appMessages.success,
        message: appMessages.passwordUpdated,
        textLink: appMessages.successPageTextLink
    })
}


module.exports = () => WebappController
