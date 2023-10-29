const events = require("events")
const emitter = new events.EventEmitter()

class MessageController {
    async getMessages(req, res, next) {
        try {
          emitter.once("newMessage", (message) => {
            res.status(200).json({message})
          })
        } catch (e) {
            next(e)
        }
    }

    async createMessage(req, res, next) {
        try {
            const message = req.body.message
            emitter.emit("newMessage", message)
            res.status(200).json({message: "Message received"})
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new MessageController()