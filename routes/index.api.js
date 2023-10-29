const Router = require("express").Router
const router = new Router()

const messageController = require("../controllers/message-controller")

router.get("/message", messageController.getMessages)
router.post("/message", messageController.createMessage)

module.exports = router