const messageModel = require("../models/messageModel")

const messageController = {
    addMess: async(req,res,next)=>{
        try {
            const {from ,to , message}= req.body
            const data = await messageModel.create({
                message:{text: message},
                users:[from,to],
                sender:from,
            })
            if(data) return res.json({msg:"msg add success"})

            return res.json({msg:"msg add fail to db"})
                
        } catch (error) {
            next(error)
        }
    },
    getAllMess: async(req,res,next)=>{
        try {
            const {from,to} = req.body
            const message = await messageModel.find({users:{$all:[from,to],},}).sort({updatedAt:1});
            const projectMessage = message.map((msg)=>{
                return {
                    fromSelf: msg.sender.toString() === from,
                    message:msg.message.text
                }
            })
            res.json(projectMessage)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = messageController