const userController = require('../controllers/userControllers')

const router = require('express').Router()
 
router.post("/register",userController.register)
router.post("/login",userController.login)
router.post("/setavatar/:id",userController.setAvatar)
router.get("/alluser/:id",userController.getAllUser)


module.exports = router