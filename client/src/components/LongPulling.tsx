import React, {ChangeEvent, useState} from "react"
import {v4 as uuidv4} from "uuid"
import axios from "../api"

const LongPulling = () => {
    const [messages, setMessages] = useState<[]>([])
    const [value, setValue] = useState<string>("")

    const sendMessage: () => Promise<[]> = async () => {
        const response = await axios.post("/api/v1/message", {message: value, id: uuidv4()})
        return []
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

                <div className="messages">
                    {messages.map((m: any, index) => <div className="message" key={m.id}>{m.message}</div>)}
                </div>
            </div>
           </>
        </div>
    )
}

export default LongPulling