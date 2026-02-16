import express from 'express'
import AssetRequest from '../model/assetRequest.js'
import Asset from '../model/asset.js'


export const raiseRequest = async (req,res)=>{
    const request=await AssetRequest.create({
        user:req.user.id,
        asset:req.body.assetId
    })
    res.json(request)
}

export const approve=async (req,res)=>{
    const request=await AssetRequest.findById(req.params.id)
    request.status="approved"

    await request.save()

    await Asset.findByIdAndUpdate(request.asset,{
        assigned_to:request.user,
        assigned_date:new Date()

    })
    res.json(request)
}

export const reject=async (req,res)=>{
    const request = await AssetRequest.findByIdAndUpdate(req.params.id)
    request.status="rejected"

    await request.save()

    await Asset.findByIdAndUpdate(request.asset,{
        assigned_to:null,
        assigned_date:null

    })
    res.json(request)
}

export const returnAsset =async (req,res)=>{
    const request=await AssetRequest.findByIdAndUpdate(req.params.id)
    request.status="returned"
    request.returnDate=new Date
    await request.save()
    await Asset.findByIdAndUpdate(request.asset,{
        return_date:new Date,
        assigned_to:null
    })

    res.json(request)
} 
// Get all requests (Admin)
export const getAllRequests = async (req, res) => {
  const requests = await AssetRequest.find()
    .populate("user", "name email")
    .populate("asset", "device_name device_type");

  res.json(requests);
};

// Get logged-in user's requests (Employee)
export const getMyRequests = async (req, res) => {
  const requests = await AssetRequest.find({ user: req.user.id })
    .populate("asset", "device_name device_type");

  res.json(requests);
};