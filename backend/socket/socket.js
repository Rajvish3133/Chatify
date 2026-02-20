import { Server } from "socket.io";
import http from "http"
import app from "../app.js";

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: 'https://chatify-1-we4r.onrender.com',
        methods: ['GET','POST'],
        credentials: true 
    },
});

export const getReceiverSocketId = (receiverId) =>{
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId->socketId}


io.on('connection', (socket)=>{
    console.log('user connected', socket.id); 

    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

     socket.on('disconnect', ()=>{
        console.log("user disconnected", socket.id);

    //         // 🔥 Important Fix
    // if (userId && userSocketMap[userId] === socket.id) {
    //   delete userSocketMap[userId];
  //  }
        
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })
})

export {io, server};