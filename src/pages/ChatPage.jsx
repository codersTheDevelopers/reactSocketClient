import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const ChatPage = () => {
    const location = useLocation();
    const userName = location.state?.userName || "Guest";

    const socketRef = useRef();
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socketRef.current = io("http://162.220.11.137:3000", {
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("Connected:", socketRef.current.id);
        });

        socketRef.current.on("messageFromServer", (data) => {
            // Expecting data as { text, sender, timestamp }
            setMessages((prev) => [...prev, data]);
        });

        socketRef.current.on("disconnect", (reason) => {
            console.log("Disconnected from server. Reason:", reason);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        // Auto-scroll to bottom when messages change
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (message.trim()) {
            if (socketRef.current && socketRef.current.connected) {
                const msgObj = {
                    text: message,
                    sender: userName,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                socketRef.current.emit("messageFromClient", msgObj);
                setMessages((prev) => [...prev, { ...msgObj, self: true }]);
                setMessage("");
            } else {
                console.warn("Socket is not connected. Message not sent.");
            }
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md flex flex-col h-[80vh]">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Welcome, {userName}!</h1>
                <div className="flex-1 overflow-y-auto mb-4 pr-2">
                    {messages.map((msg, index) => {
                        const isSelf = msg.sender === userName || msg.self;
                        return (
                            <div
                                key={index}
                                className={`flex flex-col mb-2 ${isSelf ? "items-end" : "items-start"}`}
                            >
                                <div className={`max-w-[80%] px-4 py-2 rounded-2xl shadow
                                    ${isSelf
                                        ? "bg-blue-500 text-white rounded-br-none"
                                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                                    }`}
                                >
                                    <span className="block">{msg.text || msg}</span>
                                </div>
                                <span className="text-xs text-gray-500 mt-1">
                                    {isSelf ? "You" : msg.sender || "Other"} &middot; {msg.timestamp || ""}
                                </span>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex gap-2 mt-2">
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Type a message..."
                        autoFocus
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;