import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const ChatPage = () => {
    const location = useLocation();
    const userName = location.state?.userName || "Guest";

    const socketRef = useRef(); // This will persist across re-renders

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io("http://162.220.11.137:3000", {
            transports: ["websocket"],
        });

        socketRef.current.on("connect", () => {
            console.log("Connected:", socketRef.current.id);
        });

        socketRef.current.on("messageFromServer", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        socketRef.current.on("disconnect", (reason) => {
            console.log("Disconnected from server. Reason:", reason);
        });

        // Cleanup
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            if (socketRef.current && socketRef.current.connected) {
                // Emit the message to the server
                console.log("Sending message:", message);
                socketRef.current.emit("messageFromClient", message);
                setMessage("");
            } else {
                console.warn("Socket is not connected. Message not sent.");
            }
        }
    };
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Welcome, {userName}!</h2>

            <div className="mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-200 text-black rounded-xl pl-5">
                        {msg}
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 border p-2 rounded"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
