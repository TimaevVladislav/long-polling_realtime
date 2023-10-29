const Router = require("express").Router
const router = new Router()

const messageController = require("../controllers/message-controller")
const eventController = require("../controllers/event-controller")

router.get("/message", messageController.getMessages)
router.post("/message", messageController.createMessage)

router.get("/connection", eventController.connection)
router.post("/event/message", eventController.createMessage)

module.exports = router