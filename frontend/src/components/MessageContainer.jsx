import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user,
  );
  const dispatch = useDispatch();
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className="flex flex-1 flex-col">
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-2 md:px-4 py-2 mb-2">
            <button
              onClick={() => dispatch(setSelectedUser(null))}
              className="md:hidden text-white hover:bg-zinc-700 p-1 rounded mr-2"
            >
              ← Back
            </button>
            <div className="relative w-12 h-12">
              <img
                src={selectedUser?.profilePhoto}
                alt="Profile_photo"
                className="w-12 h-12 rounded-full object-cover"
              />

              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p className="text-sm md:text-base">{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col justify-center items-center">
          <h1 className="text-2xl md:text-4xl text-white font-bold">
            Hi, {authUser?.fullName}
          </h1>
          <h1 className="text-lg md:text-2xl text-white">
            Let's start conversation
          </h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
