
const express = require('express')
const userController = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')
const checkRole = require('../middlewares/checkRole')


const router = express.Router()


router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.post('/register', userController.register)
router.post('/login',userController.login)
router.put('/:id', userController.updateUser)
router.delete('/:id',verifyToken,checkRole(["admin"]), userController.deleteUser)

module.exports = router