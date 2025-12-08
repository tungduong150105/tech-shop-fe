import { X } from "lucide-react"
import { useState } from "react"

interface ChatProps {
  setShowChat: (show: boolean) => void
}

export function Chat({ setShowChat }: ChatProps) {
  const [messages, setMessages] = useState<String[]>([])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = () => {
    setMessages((prevMessages) => [...prevMessages, inputMessage])
    setInputMessage("")
  }

  return (
    <div className="fixed right-8 bottom-8 w-[392px] bg-white rounded-lg shadow-[-2px_2px_20px_-1px_rgba(113,113,113,0.20)] border border-neutral-gray-F9 z-50">
      <div className="bg-primary px-4 py-4 rounded-t-lg flex items-center justify-between">
        <h3 className="text-xl font-light text-white">
          Tech Heim Online chat
        </h3>
        <button
          onClick={() => setShowChat(false)}
          className="text-white hover:opacity-80 transition-opacity"
        >
          <X className="w-8 h-8" />
        </button>
      </div>
      <div className="p-4 space-y-4 scrollbar-auto max-h-[400px] overflow-y-auto">
        <p className="text-l font-light text-neutral-gray-2D leading-7">
          Do you have any questions? Message us and we will answer you in a few
          minutes.
        </p>
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-neutral-gray-F1 p-3 rounded-lg max-w-[80%] shadow"
            >
              <p className="text-neutral-gray-2D">{msg}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-neutral-gray-E6">
        <div className="flex items-center gap-2 p-6 bg-neutral-gray-F9 rounded-lg shadow-[0_2px_15px_-1px_rgba(113,113,113,0.12)]">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-transparent outline-none text-neutral-gray-2D placeholder:text-neutral-gray-9B"
          />
          <div className="flex-1" />
          <button onClick={sendMessage} className="text-primary hover:opacity-80 transition-opacity">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
              <path d="M21.5202 3.94666L9.48016 7.94666C1.38682 10.6533 1.38682 15.0667 9.48016 17.76L13.0535 18.9467L14.2402 22.52C16.9335 30.6133 21.3602 30.6133 24.0535 22.52L28.0668 10.4933C29.8535 5.09333 26.9202 2.14666 21.5202 3.94666ZM21.9468 11.12L16.8802 16.2133C16.6802 16.4133 16.4268 16.5067 16.1735 16.5067C15.9202 16.5067 15.6668 16.4133 15.4668 16.2133C15.0802 15.8267 15.0802 15.1867 15.4668 14.8L20.5335 9.70666C20.9202 9.32 21.5602 9.32 21.9468 9.70666C22.3335 10.0933 22.3335 10.7333 21.9468 11.12Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
