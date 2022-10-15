const jwtService = require('./../services/jwt-service')
const appMessages = require('./../configs/i18n-config')()


function AuthController() {}


AuthController.prototype.generateToken = async (req, res) => {
    try {
        const accessToken = await jwtService.generate(req)
        res.status(201).json({accessToken})
            
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}


AuthController.prototype.verifyToken = async (req, res) => {
    res.status(200).json({
        message: appMessages.invalidToken,
        payload: req.payload
    })
}


AuthController.prototype.revokeToken = (req, res) => {
    const token = req.headers['authorization'].split(" ")[1]
    if (!!token) jwtService.revokeToken(token)
    res.status(204).json()        
}


module.exports = () => AuthController
