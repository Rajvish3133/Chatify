import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user?._id
            ? "bg-zinc-200 text-black"
            : "text-white"
        } flex gap-2 items-center hover:text-black hover:bg-zinc-200 rounded p-2 cursor-pointer`}
      >
        <div className="relative w-12 h-12">
          <img
            src={user?.profilePhoto}
            alt="Profile_photo"
            className="w-12 h-12 rounded-full object-cover"
          />

          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-sm md:text-base truncate">{user?.fullName}</p>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;
