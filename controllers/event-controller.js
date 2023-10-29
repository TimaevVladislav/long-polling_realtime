const events = require("events")
const emitter = new events.EventEmitter()

class EventController {
    async connection(req, res, next) {
        try {
          res.writeHead(200, {
             "Content-Type": "text/event-stream",
             "Connection": "keep-alive",
             "Cache-Control": "no-cache"
          })

          emitter.on("newMessage", (message) => {
              res.write(`data: ${JSON.stringify(message)}\n\n`)
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

module.exports = new EventController()


