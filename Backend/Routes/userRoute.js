import { register,loginController,getAllUsers} from "../controller/userController.js";
import express from 'express'
import {verifyUser} from '../middleware/auth.js'

const router = express.Router()

router.post("/register",register)
router.post("/login",loginController)
router.get("/all", getAllUsers);


export default router