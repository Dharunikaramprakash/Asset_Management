import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import userRoute from './Routes/userRoute.js'
import assetRoute from './Routes/assetRoute.js'
import assetReqRoute from './Routes/assetReqRoute.js'


dotenv.config()
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("mongoDB connected");
    
  })
  .catch((err)=>{
    console.log("err");
    
  })

  const app = express()
  app.use(express.json())

    app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
    credentials:true
}))

  app.use("/user",userRoute)
  app.use("/asset",assetRoute)
  app.use("/request",assetReqRoute)


const port=5000
app.listen(port,()=>{
    console.log(`running on ${port}`)
})