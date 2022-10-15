const express = require('express')
const AuthController = require('./../controllers/auth-controller')()
const tokenInterceptor = require('./../interceptors/token-interceptor')

const router = express.Router()
const controller = new AuthController()


router.patch('/token/revoke', controller.revokeToken)
router.post('/token/generate', controller.generateToken)
router.get('/token/verify', tokenInterceptor, controller.verifyToken)


module.exports = router
