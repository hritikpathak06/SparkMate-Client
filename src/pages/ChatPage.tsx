import { useEffect, useState } from "react";
import ChatComponent from "../components/chat/ChatComponent";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
import axios from "axios";
import { SERVER_BASE_API } from "../config/server_url";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const { id } = useParams();

  // console.log("Id===>> ", id);

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.get(
        `${SERVER_BASE_API}/api/v1/message/conversation/${id}`,
        {
          withCredentials: true,
        }
      );

      setMessages(data.messages);

      // console.log("Messages===>> ", data);
    };

    getMessages();
  }, [id]);

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-400 to-pink-600 overflow-hidden">
        <Sidebar url={"/dashboard/chat"} />
        <div className=" flex-grow flex flex-col overflow-hidden">
          <Navbar />
          <main className=" flex-grow flex flex-col  items-center p-4 relative overflow-hidden">
            <ChatComponent messages={messages} setMessages={setMessages}/>
          </main>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
