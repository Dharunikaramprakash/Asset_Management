import User from '../model/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register=async (req,res)=>{
    const {name,email,password,role}=req.body
    const user = await User.findOne({email:email})
    if(user){
        res.json("login")
    }
    else{
        const hashpw= await bcrypt.hash(password.toString(),10)
        const newUser= await User.create({
            name:name,
            email:email,
            password:hashpw,
            role:role

        })
        res.json("successful")
    }
}

export const loginController = async (req,res)=>{
    const  {email,password,role}=req.body;
    const  user = await User.findOne({email:email})
    if(user){
        const matchpw = await bcrypt.compare(password.toString(),user.password)
        if(matchpw){
            const token = jwt.sign({id:user._id},"jwt-token",{expiresIn:"1d"})
            res.json({
                message:"successful",
                token:token
            })
        }else{
            res.json("invalid password")
        }
    }else{
        res.json({message:"no user found"})
    }
}    

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
