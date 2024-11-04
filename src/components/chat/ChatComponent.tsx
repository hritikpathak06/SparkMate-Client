import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_BASE_API } from "../../config/server_url";

const ChatComponent = ({ messages, setMessages }: any) => {
  const user = useSelector((state: any) => state.auth.userData);
  const lastMessageRef: any = useRef(null);

  const [profile, setProfile] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${SERVER_BASE_API}/api/v1/user/profile/${id}`,
        { withCredentials: true }
      );
      setProfile(data.user);
    })();
  }, [id]);

  console.log("profile==>> ", profile);

  return (
    <div className="bg-white w-full md:h-[85vh] h-[87vh] max-h-[95vh] flex flex-col">
      <div className="flex items-center mb-4 bg-slate-300 shadow-lg p-3">
        <img
          src={profile?.image || "/public/logo.png"}
          alt=""
          className="h-12 w-12 rounded-full"
        />
        <h2 className="text-xl font-semibold text-gray-800 ml-4">
          {profile?.name}
        </h2>
      </div>

      <div className="flex-grow overflow-y-auto mb-4 bg-white rounded-lg scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-gray-100 p-4">
        {messages.length === 0 ? (
          <h1>hello</h1>
        ) : (
          messages
            .slice()
            .reverse()
            .map((msg: any, index: any) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={`mb-3 ${
                  msg.sender === user._id ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                    msg.sender === user._id
                      ? "bg-pink-500 text-white"
                      : "bg-blue-500 text-gray-200"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))
        )}
      </div>

      <div>
        <MessageInput setMessages={setMessages} messages={messages} />
      </div>
    </div>
  );
};

export default ChatComponent;