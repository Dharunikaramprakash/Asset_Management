import mongoose from 'mongoose'

 const assetSchema = new mongoose.Schema({
    device_name:{
        type:String,
        required:true
    },
    device_description:String,
    device_model:String,
    device_type:{
        type:String,
        enum:["desktop","phone","mouse","keyBoard","laptop","other"]
    },
    assigned_date:{
        type: Date,
        default:null

    },
    assigned_to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    return_date:{
        type:Date,
        default:null
    }
})

export default mongoose.model("Asset",assetSchema)