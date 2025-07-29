import { SendHorizonal } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import createSocketConnection from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Chat = () => {
    const { targetId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((store) => store.user);
    const currentUser = user?._id;
    const firstName = user?.firstName;
    const [socket, setSocket] = useState(null);
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!currentUser || !targetId) return;

            try {
                const res = await axios.get(`${BASE_URL}/api/chat/${targetId}`, {
                    withCredentials: true,
                });

                const chatMessages = res?.data?.messages.map((msg) => ({
                    sender: msg?.senderId?.firstName,
                    text: msg?.text,
                    time: new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    }),
                    isMe: msg?.senderId._id === currentUser,
                }));

                setMessages(chatMessages);
            } catch (err) {
                console.error("Failed to load chat history:", err);
            }
        };

        fetchMessages();
    }, [currentUser, targetId]);

    useEffect(() => {
        if (!currentUser || !targetId) return;

        const newSocket = createSocketConnection();
        setSocket(newSocket);

        newSocket.emit("joinChat", { currentUser, targetId });

        newSocket.on("messageReceived", ({ firstName, text, senderId }) => {
            if (senderId === currentUser) return;

            setMessages((prev) => [
                ...prev,
                {
                    sender: firstName,
                    text,
                    time: new Date().toLocaleTimeString(),
                    isMe: false,
                    status: "Delivered",
                },
            ]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [currentUser, targetId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const messageData = {
            firstName,
            currentUser,
            targetId,
            text: newMessage,
        };

        socket.emit("sendMessage", messageData);

        setMessages((prev) => [
            ...prev,
            {
                sender: "You",
                text: newMessage,
                time: new Date().toLocaleTimeString(),
                isMe: true,
                status: "Sent",
            },
        ]);

        setNewMessage("");
    };

    return (
  <div className="w-full flex justify-center items-start p-2 pt-4  h-screen">
    <div
      className="w-full max-w-5xl bg-gray-900 border border-gray-700 rounded-xl shadow-xl flex flex-col overflow-hidden flex-1"
      
    >
      {/* Header */}
      <div className="p-4 bg-gray-850 border-b border-gray-700 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
            Hi!
          </div>
          <h2 className="text-xl font-semibold">Chat</h2>
        </div>
        <span className="text-sm text-green-400 animate-pulse">Online</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-black/10">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet</p>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[85%] flex flex-col space-y-1">
                  <div
                    className={`flex items-center gap-2 ${
                      msg.isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!msg.isMe && (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-sm font-semibold text-white">
                        {msg.sender?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <div className="text-xs text-gray-400 flex items-center">
                      <span className="font-medium">{msg.sender}</span>
                      <span className="ml-2 opacity-70">{msg.time}</span>
                    </div>
                  </div>

                  <div
                    className={`relative px-4 py-2 rounded-2xl text-sm shadow-md break-words max-w-full ${
                      msg.isMe
                        ? "bg-blue-600 text-white self-end rounded-br-none"
                        : "bg-gray-800 text-gray-100 self-start rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.isMe && (
                    <div className="text-xs text-gray-400 text-right pr-2">
                      {msg.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-gray-850 border-t border-gray-700 flex items-center gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-gray-700/80 border border-gray-600 focus:border-blue-500 rounded-full text-sm outline-none placeholder-gray-400 text-white transition"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-transform hover:scale-105 shadow-lg"
          onClick={sendMessage}
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  </div>
);

};

export default Chat;
