import { useEffect, useMemo, useRef, useState } from 'react'
import { Bot, MessageCircle, Send, X, Loader2, PlusCircle } from 'lucide-react'
import { useValidateToken } from '../../hooks/useAuth'
import {
  useAiChats,
  useAiMessages,
  useCreateAiChat,
  useSendAiMessage,
  useDeleteAiChat
} from '../../hooks/useAiAssistant'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

const AiChatWidget = () => {
  const { data: userData } = useValidateToken()
  const hasToken = !!localStorage.getItem('accessToken')

  if (!hasToken || !userData?.user) return null

  return <AiChatWidgetInner />
}

function AiChatWidgetInner() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [activeChatId, setActiveChatId] = useState<string | number | undefined>(
    undefined
  )
  const [autoCreated, setAutoCreated] = useState(false)

  const { data: chatsData, isLoading: chatsLoading } = useAiChats(isOpen)
  const chats = chatsData?.data?.chats || []

  const selectedChatId = useMemo(() => {
    if (activeChatId) return activeChatId
    if (chats.length > 0) return chats[0].id
    return undefined
  }, [activeChatId, chats])

  const { data: messagesData, isLoading: messagesLoading } =
    useAiMessages(selectedChatId)
  const messages = messagesData?.data?.messages || []

  const createChatMutation = useCreateAiChat()
  const sendMessageMutation = useSendAiMessage()
  const deleteChatMutation = useDeleteAiChat()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    } else if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // Auto create a chat when widget opened and no chat exists
  useEffect(() => {
    if (
      isOpen &&
      !chatsLoading &&
      chats.length === 0 &&
      !autoCreated &&
      !createChatMutation.isPending
    ) {
      createChatMutation
        .mutateAsync()
        .then(res => {
          setActiveChatId(res.data.id)
          setAutoCreated(true)
        })
        .catch(err => {
          toast.error(err?.response?.data?.error || 'Không tạo được hội thoại')
        })
    }
  }, [isOpen, chatsLoading, chats.length, autoCreated, createChatMutation])

  const handleCreateChat = async () => {
    try {
      const res = await createChatMutation.mutateAsync()
      setActiveChatId(res.data.id)
      setAutoCreated(true)
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Tạo hội thoại thất bại')
    }
  }

  const handleSend = async () => {
    if (!message.trim() || !selectedChatId) return
    try {
      await sendMessageMutation.mutateAsync({
        chatId: selectedChatId,
        content: message.trim()
      })
      setMessage('')
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Gửi tin nhắn thất bại')
    }
  }

  const handleDelete = async (chatId: string | number) => {
    try {
      await deleteChatMutation.mutateAsync(chatId)
      if (activeChatId === chatId) {
        setActiveChatId(undefined)
      }
      setMessage('')
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Xóa hội thoại thất bại')
    }
  }

  const renderMessageContent = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+\.[^\s]{2,})/gi

    const parts = text.split(urlRegex).filter(Boolean)

    return (
      <div className="space-y-2">
        {parts.map((part, idx) => {
          const isUrl = urlRegex.test(part)
          urlRegex.lastIndex = 0
          if (isUrl) {
            const url = part.startsWith('http') ? part : `https://${part}`
            const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(url)
            return (
              <div key={idx}>
                {isImage ? (
                  <img
                    src={url}
                    alt="image"
                    className="rounded-md max-h-52 border border-gray-200"
                    loading="lazy"
                  />
                ) : (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 underline break-all"
                  >
                    {url}
                  </a>
                )}
              </div>
            )
          }
          return (
            <p key={idx} className="whitespace-pre-wrap break-words">
              {part}
            </p>
          )
        })}
      </div>
    )
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-24 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center z-50"
          aria-label="Open AI chat"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-24 w-[430px] h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">AI trợ lý</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-emerald-700 rounded transition"
              aria-label="Close AI chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col flex-1 min-h-0">
            <div className="border-b px-4 py-3 flex items-center gap-2 overflow-x-auto">
              {chatsLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" /> Đang tải hội
                  thoại...
                </div>
              ) : (
                <>
                  {chats.map(chat => (
                    <div
                      key={chat.id}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${
                        selectedChatId === chat.id
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <button
                        onClick={() => setActiveChatId(chat.id)}
                        className="text-left"
                      >
                        {chat.title || `Chat #${chat.id}`}
                      </button>
                      <button
                        onClick={() => handleDelete(chat.id)}
                        className="p-1 rounded text-gray-400 hover:text-red-600"
                        aria-label="Xóa hội thoại"
                        disabled={deleteChatMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleCreateChat}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm border border-dashed border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Mới
                  </button>
                </>
              )}
            </div>

            <div
              ref={scrollRef}
              className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50"
            >
              {messagesLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" /> Đang tải tin
                  nhắn...
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                  <MessageCircle className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                  <p>
                    {selectedChatId
                      ? 'Bắt đầu trò chuyện với AI trợ lý'
                      : 'Chưa có hội thoại. Tạo mới để bắt đầu.'}
                  </p>
                </div>
              ) : (
                messages.map(msg => {
                  const isAi = msg.role === 'assistant'
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isAi ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                          isAi
                            ? 'bg-white border border-gray-200 text-gray-900'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {renderMessageContent(msg.content)}
                        <p
                          className={`text-[11px] mt-1 ${
                            isAi ? 'text-gray-500' : 'text-emerald-100'
                          }`}
                        >
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t px-4 py-3 bg-white">
              <div className="flex gap-2">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  rows={2}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={
                    !message.trim() ||
                    sendMessageMutation.isPending ||
                    !selectedChatId
                  }
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {sendMessageMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">
                Nhấn Enter để gửi, Shift+Enter để xuống dòng.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AiChatWidget
