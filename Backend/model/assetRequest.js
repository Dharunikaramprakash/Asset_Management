import mongoose from 'mongoose'

const assetrequestSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    asset:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Asset"
    },
    status:{
        type:String,
        enum:["pending","approved","rejected","returned"],
        default:"pending"
    },
    requestDate:{
        type:Date,
        default:Date.now
    },
    returnDate:{
        type:Date,
        default:null
    }
})

export default mongoose.model("AssetRequest",assetrequestSchema)