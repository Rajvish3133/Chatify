import React, { useState, useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers, setAuthUser, setSearchUsers } from "../redux/userSlice";
import { setSocket } from "../redux/socketSlice";
import { useEffect } from "react";
import { BACKEND_URL } from "../main.jsx";

const Sidebar = () => {
  const { otherUsers, authUser, selectedUser, searchUsers } = useSelector(
    (store) => store.user,
  );
  const [search, setSearch] = useState("");

  const socket = useSelector((store) => store.socket.socket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(setSearchUsers([]));

      try {
        socket?.close();
      } catch (e) {}

      dispatch(setSocket(null));
      dispatch(setAuthUser(null));
      dispatch(setOtherUsers([]));

      localStorage.removeItem("persist:root");

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    if (search === "") {
      dispatch(setSearchUsers(otherUsers));
    } else {
      const query = search.trim().toLowerCase();

      if (!query) {
        toast.error("Enter a name to search");
        return;
      }

      const filteredUsers = otherUsers?.filter((user) =>
        user.fullName?.toLowerCase().includes(query),
      );

      if (filteredUsers.length > 0) {
        dispatch(setSearchUsers(filteredUsers));
      } else {
        toast.error("User not found!");
        dispatch(setSearchUsers([]));
      }
    }
  }, [search, otherUsers]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    const query = search.trim().toLowerCase();

    if (!query) {
      toast.error("Enter a name to search");
      return;
    }

    const filteredUsers = otherUsers?.filter((user) =>
      user.fullName?.toLowerCase().includes(query),
    );

    if (filteredUsers.length > 0) {
      dispatch(setSearchUsers(filteredUsers));
    } else {
      toast.error("User not found!");
    }
  };

  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePhoto", file);
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/user/photo`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      dispatch(setAuthUser(res.data.user));
      toast.success(res.data.message);
    } catch (err) {
      console.error("upload error", err.response || err);
      const msg =
        err.response?.data?.message || err.message || "Unable to upload photo";
      toast.error(msg);
    }
  };
  return (
    <div
      className={`${selectedUser ? "hidden" : "flex"} md:flex w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-500 p-4 flex-col md:overflow-y-auto`}
    >
      {authUser && (
        <div className="mb-4 flex items-center space-x-2">
          <img
            src={authUser.profilePhoto}
            alt="avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={handleProfileClick}
          />
          <span className="text-white text-sm md:text-base truncate">
            {authUser.fullName}
          </span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-1 md:gap-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md text-xs md:text-sm w-full"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn btn-sm bg-zinc-700 text-white">
          <BiSearchAlt2 className="w-4 md:w-6 h-4 md:h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="mt-2">
        <button
          onClick={logoutHandler}
          className="btn btn-sm text-xs md:text-base w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
