const appMessages = require('./../configs/i18n-config')()
const userService = require('./../services/users-service')

function UserController() {}


UserController.prototype.create = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password)
        return res.status(400).json({ message: appMessages.usernameAndPasswordRequired})

    try {
        const user = await userService.createUser(req.body)
       res.status(201).json({user, message: appMessages.userCreationSucess})

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


UserController.prototype.sendUpdatePasswordCode = async (req, res) => {
    if (!req.query.username)
        return res.status(400).json({message: appMessages.usernameRequired})

    try {
        userService.sendUpdatePasswordCode(req.query.username)
        res.status(200).json({message: appMessages.updatePasswordEmail})
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


UserController.prototype.sendActivationAccountCode = async (req, res) => {
    if (!req.query.username)
        return res.status(400).json({message: appMessages.usernameRequired})

    try {
        userService.sendActivationCodeToUser(req.query.username)
        res.status(200).json({message: appMessages.activationAccountEmail})
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


UserController.prototype.clearProfile = async (req, res) => {
    try {
        await userService.clearUserProfile(req.headers.username)
        return res.status(200).json({message: appMessages.userProfileClear})

    } catch (error) {
        return res.status(400).json({message: error.message})        
    }
}


UserController.prototype.updateProfile = async (req, res) => {
    if (!req.body)
        return res.status(400).json({message: appMessages.bodyRequired})
    
    try {
        await userService.updateUserProfile(req.headers.username, req.body)

    } catch (error) {
        return res.status(400).json({message: error.message})                
    }
}


UserController.prototype.deactivateAccount = async (req, res) => {
    try {
        await userService.deactivateUser(req.headers.username)
        return res.status(200).json({message: appMessages.userDeactivated})

    } catch (error) {
        return res.status(400).json({message: error.message})        
    }    
}


UserController.prototype.activateAccount = async (req, res) => {
    try {
        const username = req.query.username
        const activationCode = req.query.code
        const result = await userService.activateUser(username, activationCode)
        return !!result ? res.status(200).json({message: appMessages.userActive}) : res.status(200).json({message: appMessages.userNotActivatedError})

    } catch (error) {
        return res.status(400).json({message: error.message})        
    }    
}


UserController.prototype.updatePassword = async (req, res) => {
    try {
        const code = req.query.code
        const username = req.query.username
        const newPassword = req.query.password
        
        await userService.updateUserPassword(username, code, newPassword)

    } catch (error) {
        let message = error.message

        if (message.includes("Cannot read property 'code' of null"))
            message = appMessages.passwordCodeExpiration

        return res.status(400).json({message})        
    }

    res.status(200).json({ message: appMessages.passwordUpdated})
}


UserController.prototype.getUserByEmailOrId = async (req, res) => {
    const usernameOrId = req.params.usernameOrId

    try {
        const user = await userService.findUser(usernameOrId)
        return res.status(200).json(user)

    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}


UserController.prototype.listUsersWithFilter = async (req, res) => {
    const page = req.query.page || 1
    const size = req.query.size || 10
    
    const profileFilter = {}

    Object.keys(req.query).filter(k => k.includes('profile.')).forEach(field => {
        profileFilter[field] = req.query[field]
    })

    // filters
    const active = req.query.active
    const username = !!req.query.username ? req.query.username.split(',') : ''

    const users = await userService.findAll(page, size, username, active, profileFilter)

    res.status(200).json(users)
}


UserController.prototype.deleteUser = async (req, res) => {
    const usernameOrId = req.params.usernameOrId

    try {
        await userService.removeUser(usernameOrId)
        return res.status(200).json({message: appMessages.userRemoved})

    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}


module.exports = () => UserController