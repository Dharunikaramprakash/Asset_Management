import jwt from 'jsonwebtoken';

export const verifyUser= async (req,res,next)=>{
    let token;
    const authHead = req.headers.authorization

    if(authHead && authHead.startsWith("Bearer ")){
        token=authHead.split(" ")[1]
    }
    if(!token){
        return res.json("not authorised")
    }
    let decoded=jwt.verify(token,"jwt-token")
    req.user=decoded
    next()
}  