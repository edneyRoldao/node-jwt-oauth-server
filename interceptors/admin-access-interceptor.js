const appEnv = require('./../configs/env-config')()
const appMessages = require('./../configs/i18n-config')()


module.exports = async (req, res, next) => {
    const token = req.headers['authorization']

    if (!token)
        return res.status(401).json({message: appMessages.adminTokenPresentError})

    if (token != appEnv.adminAccessToken)
        return res.status(401).json({message: appMessages.adminTokenInvalidError})

    next()
}
