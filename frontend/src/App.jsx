import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import { Navigate }from "react-router-dom";


function App() {

  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  let socket;

  useEffect(() => {
    if (authUser) {
      socket = io("https://chatify-awuy.onrender.com", {
        withCredentials: true,
        query: {
          userId: authUser?._id,
        },
      });

      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser? <HomePage /> : <Navigate to='/login' />,
    },
    {
      path: "/register",
      element: !authUser ? <Signup /> :  <Navigate to='/' />,
    },
    {
      path: "/login",
      element: !authUser ? <Login /> :  <Navigate to='/' />,
    },
  ]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;