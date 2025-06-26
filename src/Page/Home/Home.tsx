import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import { socket } from "../../assets/Connect Socket/Connect Socket";

import { Link } from "react-router-dom";
import { getMessage, sendChat } from "../../Axios Intandce/Call API";
import { setCookie } from "../../assets/get cookies/get cookies";






const HomePage = () => {
    const outletContext = useOutletContext() as { data: { isValid: boolean, account: { _id: string, usename: string, email: string, img: string } } };
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<
        { id: string; message: string, time: string }[]
    >([]);
    useEffect(() => {

        if (outletContext) {
            (async () => {
                const listChat = (await getMessage()).data.messages as { id: string; message: string, time: string }[]
                setMessages(listChat)
                const formChat = document.querySelector('.form-chat') as HTMLElement
                if (formChat) {
                    const heightChat = formChat.scrollHeight
                    console.log(heightChat);

                    setTimeout(() => {
                        formChat.scrollTop = 1000000000000000000000000
                    }, 100)
                }
            })()
        }
        socket.on("chat", (data) => {
            setMessages(data)
            const formChat = document.querySelector('.form-chat') as HTMLElement
            if (formChat) {
                const heightChat = formChat.scrollHeight
                setTimeout(() => {
                    formChat.scrollTop = heightChat
                }, 100)
            }
        })

    }, [outletContext])
    
    const sendMessage = () => {
        sendChat({ message })
    };
    if (!messages) return <></>

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <div className="bg-white p-4 flex justify-between items-center shadow">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300" />
                    <span className="font-bold text-lg">Chat App</span>
                </div>

                <div className="relative group">
                    <div>

                    </div>
                    <button
                        className="p-2 hover:bg-gray-200 rounded"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div
                        className="absolute hidden group-hover:block right-0 top-full bg-white shadow rounded w-40 z-10"
                    >
                        <Link to={"/profile"} className="px-4 py-2 block hover:bg-gray-100 cursor-pointer">🧑 Hồ sơ cá nhân</Link>
                        <Link to={"/admin"} className="px-4 py-2 block hover:bg-gray-100 cursor-pointer">🧑 Khu Admin</Link>
                        <Link to={"/login"} onClick={() => {
                            setCookie('token', '');
                        }} className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer">⎋ Đăng xuất</Link>
                    </div>
                </div>
            </div>

            {/* Chat content */}
            <div className="form-chat flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => (
                    <div key={index} data-d = {`${msg.id} ${outletContext.data.account._id}`} className={`flex ${msg.id == outletContext.data.account._id ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`p-3 rounded-lg max-w-xs text-sm ${outletContext.data.isValid ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'
                                }`}
                        >
                            {msg.message}
                            <div className="text-xs text-gray-400 mt-1 text-right">{msg.time}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat input */}
            <div className="p-4 bg-white flex items-center gap-2">
                <input
                    type="text"
                    className="flex-1 border rounded px-4 py-2 text-sm"
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        e.key === 'Enter' && sendMessage()
                        e.key === 'Enter' && setMessage('')
                    }}
                />
                <button onClick={() => {
                    sendMessage()
                    setMessage('')
                }} className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700">
                    <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                    </svg>
                </button>
            </div>
        </div>
    );

}

export default HomePage