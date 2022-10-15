const express = require('express')
const WebappController = require('./../controllers/webapp-controller')()

const router = express.Router()
const controller = new WebappController()

router.get('/', controller.getLoginPage)
router.get('/login', controller.getLoginPage)
router.get('/create-user', controller.getCreateUserPage)
router.get('/activate-user', controller.getActivateUserPage)
router.get('/user/new-password', controller.getUserNewPasswordPage)
router.get('/update-user-password', controller.getUpdateUserPasswordPage)
router.get('/user/send-activation-code', controller.getActivateUserAccountPage)

router.post('/login', controller.login)
router.post('/create-user', controller.createUser)
router.post('/activate-user', controller.activateUser)
router.post('/user/new-password', controller.newPassword)
router.post('/update-user-password', controller.updateUserPassword)

module.exports = router
