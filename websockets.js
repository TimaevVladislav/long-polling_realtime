const ws = require("ws")

const wss = new ws.WebSocketServer({
    port: 5000,
}, () => console.log(`Server started on 5000`))


wss.on("connection", function connection(ws) {
    ws.on("message", function (message) {
        message = JSON.parse(message)
        if (message.event === "message") {
            broadcastMessage(message)
        } else if (message.event === "connection") {
            broadcastMessage(message)
        }
    })
})

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}