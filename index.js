const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
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

