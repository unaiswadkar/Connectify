import React, { useEffect, useRef } from "react";
import { useChatStore } from "../Store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessagesInput from "./MessagesInput";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { formatMessageTime } from "../Lib/utils.js";
import { userAuthStore } from "../Store/useAuthStore.js";
function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = userAuthStore();

  const messageEndRef = useRef();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div>
        <ChatHeader />
        <MessageSkeleton />
        <MessagesInput />
      </div>
    );
  }
  return (
    <div className=" flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic ||
                        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                  onLoad={() => {
                    messageEndRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                    });
                  }}
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessagesInput />
    </div>
  );
}

export default ChatContainer;
