const User  = require('../models/userModel')
const bcrypt = require('bcrypt')

const userController = {
    register:  async (req,res,next) =>{
       try {
       const {username,email,password } = req.body;
       
       const usernameCheck  = await User.findOne({username})
       if(usernameCheck){
        return   res.json({msg:"username already used",status:false})
       }
       const emailCheck  = await User.findOne({email})
       if(emailCheck){
        return  res.json({msg:"email already used",status:false})
       }

       const hashPassword = await bcrypt.hash(password,10)
       const user = await User.create({
        email,username,password:hashPassword,
       });
       delete user.password;
       return res.json({user,status:true})
       } catch (error) {
            next(error)
       }
    },
    login: async (req,res,next)=>{
        try {
            const {username,password } = req.body;
        
            const user  = await User.findOne({username})

            if(!user){
                return   res.json({msg:"Incorrect username or password ",status:false})
            }
            const isPasswordValid  = await bcrypt.compare(password,user.password);
            if(!isPasswordValid){
                return   res.json({msg:"Incorrect username or password ",status:false})
            }
            return res.json({user,status:true})

        } catch (error) {
            next(error)
        }
    },
    setAvatar : async (req,res,next)=>{
        try {
            const userId = req.params.id
            const avatarImage = req.body.image
     
            const userData = await User.findByIdAndUpdate(userId,{
                isAvatarImageSet:true,
                avataImage:avatarImage,
            })
            return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
        } catch (error) {
            next(error)
        }
    },
    getAllUser:async(req,res,next)=>{
        try {
            const users = await User.find({_id:{$ne:req.params.id}}).select([
                "email","username","avataImage","_id",
            ])
            return res.json(users)
        } catch (error) {
            next(error)
        }
    }
}

module.exports  = userController