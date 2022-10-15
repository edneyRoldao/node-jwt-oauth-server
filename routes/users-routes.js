const express = require('express')
const tokenInterceptor = require('./../interceptors/token-interceptor')
const adminTokenInterceptor = require('./../interceptors/admin-access-interceptor')
const UserController = require('./../controllers/users-controller')()

const router = express.Router()
const controller = new UserController()


router.post('/create', controller.create)

router.get('/', adminTokenInterceptor, controller.listUsersWithFilter)
router.get('/:usernameOrId', adminTokenInterceptor, controller.getUserByEmailOrId)

router.put('/clear-profile', tokenInterceptor, controller.clearProfile)
router.put('/update-profile', tokenInterceptor, controller.updateProfile)

router.patch('/activate', controller.activateAccount)
router.patch('/update-password', controller.updatePassword)
router.patch('/activate/send-code', controller.sendActivationAccountCode)
router.patch('/deactivate', tokenInterceptor, controller.deactivateAccount)
router.patch('/update-password/send-code', controller.sendUpdatePasswordCode)
router.patch('/:usernameOrId/delete', adminTokenInterceptor, controller.deleteUser)


module.exports = router
