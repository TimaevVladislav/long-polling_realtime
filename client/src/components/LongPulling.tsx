import React, {ChangeEvent, useEffect, useState} from "react"
import {v4 as uuidv4} from "uuid"
import axios from "../api"

interface IMessage {
    id: string
    message: string
}

const LongPulling = () => {
    const [messages, setMessages] = useState<any>([])
    const [value, setValue] = useState<string>("")

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe: () => void = async () => {
       try {
           const {data} = await axios.get("/api/v1/message")
           setMessages((prev: []) => [data, ...prev])
       } catch (e) {
           setTimeout(() => subscribe(), 500)
       }
    }

    const sendMessage: () => Promise<string> = async () => {
        try {
            const response = await axios.post("/api/v1/message", {message: value, id: uuidv4()})
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
              {messages.map((m: IMessage, index: number) => <div className="message" key={m.id}>{m.message}</div>)}
            </div>
           </>
        </div>
    )
}

export default LongPulling