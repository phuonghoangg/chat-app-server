const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const socket = require('socket.io')
const messageRouter = require('./routes/messageRoutes')
const userRouter = require('./routes/userRoutes')
dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth",userRouter)
app.use("/api/message",messageRouter)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to db ");
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running port:  ${process.env.PORT}`);
})

const io = socket(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    }
})

global.onlineUsers = new Map()

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    socket.on("send-msg",(data)=>{
        console.log("asd",{data});
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieved",data.message)
        }
    })
})



