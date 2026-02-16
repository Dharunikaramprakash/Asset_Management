import { approve, raiseRequest, reject, returnAsset,getAllRequests,getMyRequests } from "../controller/assetRequestController.js";
import express from 'express'
import { verifyUser } from "../middleware/auth.js";

const router=express.Router()

router.post("/raise",verifyUser,raiseRequest)
router.put("/approve/:id",verifyUser,approve)
router.put("/reject/:id",verifyUser,reject)
router.put("/return/:id",verifyUser,returnAsset)
router.get("/all", verifyUser, getAllRequests);  // Admin
router.get("/my", verifyUser, getMyRequests);   // Employee


export default router
