import React, {ChangeEvent, useEffect, useState} from "react"
import {v4 as uuidv4} from "uuid"
import axios from "../api"

const EventSourcing = () => {
    const [messages, setMessages] = useState<any>([])
    const [value, setValue] = useState<string>("")

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe: () => void = async () => {
       try {
          const eventSource = new EventSource("http://localhost:5000/api/v1/connection")
          eventSource.onmessage = function (event: any) {
          const message = JSON.parse(event.data)
          console.log(message)
          setMessages((prev: []) => [message, ...prev])
          }
       } catch (e) {

       }
    }

    const sendMessage: () => Promise<string> = async () => {
        try {
            const response = await axios.post("/api/v1/event/message", {message: value, id: uuidv4()})
            return response.data
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="center">
           <>
            <div className="form">
                <input
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    type="text"
                />

                <button onClick={sendMessage}>
                    Отправить
                </button>
            </div>

            <div className="messages">
              {messages.map((m: string, index: number) => <div className="message" key={index}>{m}</div>)}
            </div>
           </>
        </div>
    )
}

export default EventSourcing