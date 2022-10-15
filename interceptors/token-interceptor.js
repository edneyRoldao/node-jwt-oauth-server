const jwtService = require('../services/jwt-service')
const appMessages = require('./../configs/i18n-config')()


module.exports = async (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1]

    if (!token)
        return res.status(401).json({message: appMessages.bearerTokenPresentError})

    try {
        user = await jwtService.verify(token)

        if (!user)
            return res.status(401).json({message: appMessages.invalidToken})

        req.payload = user
        req.headers.username = user.username
        
    } catch (error) {
        return res.status(401).json({message: appMessages.invalidToken})            
    }

    next()
}
