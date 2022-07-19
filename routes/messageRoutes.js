const messageController = require('../controllers/messageController')

const router = require('express').Router()
 
router.post("/addmsg",messageController.addMess)
router.post("/getmsg",messageController.getAllMess)



module.exports = router