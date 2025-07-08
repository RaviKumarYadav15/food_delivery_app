import{ApiResponse} from '../utils/ApiResponse.js'
import{ApiError} from '../utils/ApiError.js'
import{asyncHandler} from '../utils/asyncHandler.js'
import User from '../models/user.models.js'
import Order from '../models/order.models.js'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = asyncHandler(async(req,res)=>{

    const frontendUrl = process.env.CLIENT_URL;
    try {
        const newOrder = new Order({
            userId: req.user._id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        const order = await newOrder.save()

        await User.findByIdAndUpdate(req.user._id,{cartData:{}});

        const line_items = req.body.items.map(item=>({
            price_data:{
                currency: 'inr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 86 
            },
            quantity: item.quantity
        }))


        line_items.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 2 * 100 * 86 
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${order._id}`,
        })

        res.status(200).json(
            new ApiResponse(
                200,
                {
                    newOrder: order._id,
                    sessionId: session.id
                },
                "Order placed successfully",
            )
        )
    } catch (error) {
        console.error("Error placing order:", error);
        throw new ApiError(
            500,
            "Internal Server Error",
            "Failed to place order"
        )
    }
})

const verifyOrder = asyncHandler(async(req,res)=>{
    const {orderId, success } = req.body;
    try {
        if(success =="true"){
            await Order.findByIdAndUpdate(orderId,{payment:true});
            res.json(
                new ApiResponse(200,{},"Paid")
            )
        }
        else{
            await Order.findByIdAndDelete(orderId);
            throw new ApiError(400,"Not PAID")
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"Error")
    }
})

const userOrder = asyncHandler(async(req,res)=>{
    try {
        const orders = await Order.find(req.user._id);
        res.status(200)
            .json(
                new ApiResponse(200,orders,"Order retreived successfully")
            )
    } catch (error) {
        console.log(error);
        throw new ApiError(400,"Order not found");
    }
})

// listing order for admin panel
const listOrders = asyncHandler(async(req,res)=>{
    try {
        const orders = await Order.find({});
        res.status(200)
            .json(
                new ApiResponse(200,orders,"All orders listed Successfully")
            )
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"Error while listing Orders")
    }
})

// api for updating the order status
const updateStatus = asyncHandler(async(req,res)=>{
    try {
        await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.status(200)
            .json(
                new ApiResponse(200,{},"status updated")
            )
    } catch (error) {
        console.log("error:",error);
        throw new ApiError(400,"status not Updated");
    }
})

export {
    placeOrder,
    verifyOrder,
    userOrder,
    listOrders,
    updateStatus
}