import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req , res)=>{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;

      let gotConversation = await Conversation.findOne({
        participants : {$all : [senderId , receiverId]}
      });

      if(!gotConversation){
        gotConversation = await Conversation.create({
            participants : [senderId, receiverId]
        })
       }

      const newMessage = await Message.create({
        senderId,
        receiverId,
        message
      });
      
      if(newMessage){
        gotConversation.messages.push(newMessage._id);
      }
      // await gotConversation.save();
      
   await Promise.all([gotConversation.save(), newMessage.save()]);
      // SOCKET IO

      const receiverSocketId = getReceiverSocketId(receiverId);
      if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

     
      return res.status(201).json({
        newMessage
      })

    } catch (error) {
        console.log(error);
    }
}

export const getmessage = async(req, res)=>{
    try {
       const receiverId = req.params.id;
       const senderId = req.id;
       const conversation = await Conversation.findOne({
        participants:{$all : [senderId, receiverId]}
       }).populate("messages");

    return res.status(201).json(conversation?.messages) 
    
    } catch (error) {
        console.log(error);
        
    }
}


// populate() is one of the most important MongoDB/Mongoose concepts, especially for chat apps, job portals, dashboards, etc.

// 🔹 What is populate()?
// Simple words:

// populate() replaces ObjectId references with actual data from another collection.

// 🧠 Problem without populate()

// Assume this Message schema:

// const messageSchema = new mongoose.Schema({
//   senderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   receiverId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   message: String,
// });

// Query without populate:
// const messages = await Message.find();

// Response:
// {
//   "_id": "65aa1...",
//   "senderId": "65a10f...",
//   "receiverId": "65a112...",
//   "message": "Hello"
// }


// ❌ Only IDs — no username, no profile photo

// ✅ What populate() does
// With populate:
// const messages = await Message.find()
//   .populate("senderId")
//   .populate("receiverId");

// Response becomes:
// {
//   "_id": "65aa1...",
//   "senderId": {
//     "_id": "65a10f...",
//     "username": "rajvish",
//     "profilePhoto": "img.png"
//   },
//   "receiverId": {
//     "_id": "65a112...",
//     "username": "amit"
//   },
//   "message": "Hello"
// }


// ✅ MongoDB IDs replaced with full user objects