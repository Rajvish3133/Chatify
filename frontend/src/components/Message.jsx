import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);

  const isSender = authUser?._id === message?.senderId;

  const formatTime = (date) => {
    if (!date) return "";
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };
    return new Date(date).toLocaleTimeString([], options);
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={scroll}
      className={`chat ${isSender ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="profile"
            src={
              isSender
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>

      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">
          {formatTime(message?.createdAt)}
        </time>
      </div>
      
      <div
        className={`chat-bubble ${
          isSender
            ? "bg-black text-white"
            : "bg-white text-black border"
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;

