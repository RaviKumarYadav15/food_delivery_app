import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
    userId:{type:String,required:true},
    items:{type:String,required:true},
    amount:{type:Number,required:true},
    adderess:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:true}
})

const Order = mongoose.models.Order || mongoose.model("Order",orderSchema);

export default Order;