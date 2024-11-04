import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { SERVER_BASE_API } from "../../config/server_url";
import { useParams } from "react-router-dom";
import { SendIcon, Smile } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getSocket } from "../../socket/socket";

type MessageInputProps = {
  setMessages?: any;
  messages?: any;
};

const MessageInput: React.FC<MessageInputProps> = ({ setMessages }) => {
  const { id } = useParams();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  // const emojiPickerRef = useRef(null);

  const user = useSelector((state: any) => state.auth.userData);

  const socket = getSocket();

  useEffect(() => {
    console.log("Socket initialized:", socket);
    // Listen for incoming messages
    socket.on("getMessage", (newMessage: any) => {
      console.log("Received new message from server:", newMessage);
      setMessages((prevMessages: any) => [newMessage, ...prevMessages]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("getMessage");
      console.log("Socket listener for 'getMessage' removed.");
    };
  }, [socket]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    console.log("Sending message:", message);

    try {
      await axios.post(
        `${SERVER_BASE_API}/api/v1/message/send`,
        { content: message, receiverId: id },
        { withCredentials: true }
      );

      const newMessage = {
        content: message,
        sender: user._id,
        receiver: id,
      };

      // Emit the message to the server
      socket.emit("sendMessage", newMessage);
      console.log("Emitted 'sendMessage' event with data:", newMessage);

      // Update local messages state
      setMessages((prevMessages: any) => [newMessage, ...prevMessages]);
      setMessage("");
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Failed to send message");
    }
  };

  return (
    <div>
      <form className="flex relative bg-gray-300" onSubmit={handleSendMessage}>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          type="button"
          className="absolute mt-2 left-3 top-[40%] transform -translate-y-1/2 hover:text-pink-500 text-pink-950 focus:outline-none"
        >
          <Smile className="h-6 w-6" />
        </button>
        <input
          type="text"
          placeholder="Enter Your Message"
          className="bg-gray-300 text-black flex-grow p-3 pl-12 rounded-l-lg border-2 focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          <SendIcon className="h-8 w-8 text-pink-700" />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-4">
            <EmojiPicker
              onEmojiClick={(emojiObject) => {
                setMessage((prev) => prev + emojiObject.emoji);
              }}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default MessageInput;
