import Asset from '../model/asset.js'
import express from 'express'

export const addAsset = async (req,res)=>{
          const asset=await Asset.create(req.body)
          res.json({
            message:"success",
            asset
          })
}

export const getAllasset = async (req,res)=>{
         const assets = await Asset.find().populate("assigned_to", "name email");
  res.json(assets);  
}

export const getAvailable = async (req,res)=>{
    const asset=await Asset.find({assigned_to:null});
    res.json(asset)
    
}

export const assetAssign = async (req,res)=>{
    const {assetId,userId}=req.body
    const asset= await Asset.findById(assetId)

    if(asset.assigned_to){
        res.json("already assigned")
    }
    asset.assigned_to=userId
    asset.assigned_date=new Date
    asset.return_date=null

    await asset.save()

    res.json({
        message:"assigned successfully",
        asset
    })
}

export const assetReturn = async (req,res)=>{
    const {assetId}=req.body
    const asset=await Asset.findById(assetId)

    asset.assigned_to=null
    asset.return_date=new Date()

    await asset.save()
    res.json(asset)
}

export const assetDelete=async (req,res)=>{
    const {assetId}=req.body
    const asset=await Asset.findByIdAndDelete(assetId)
    res.json({message:"deleted"})
}