import express from 'express'
import { addAsset,assetAssign,assetDelete,assetReturn,getAllasset,getAvailable } from '../controller/assetController.js'
import { verifyUser } from '../middleware/auth.js'

const router = express.Router()

router.post("/create",verifyUser,addAsset)
router.get("/all",verifyUser,getAllasset)
router.get("/available",verifyUser,getAvailable)
router.post("/assign",verifyUser,assetAssign)
router.put("/return",verifyUser,assetReturn)
router.delete("/delete",verifyUser,assetDelete)


export default router

