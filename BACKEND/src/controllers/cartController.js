import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.models.js";

const addToCart = asyncHandler(async(req,res)=>{
    const {itemId} = req.body;
    if(!itemId){
        throw new ApiError(400, "Food ID is required");
    }

    const user = await User.findById(req.user._id);

    const cart = user.cartData;

    if(cart[itemId]) cart[itemId]+=1;
    else cart[itemId]=1;

    const newData = await User.findByIdAndUpdate(
        req.user._id,
        {cartData:cart},
        {new:true}
    ).select("-password -refreshToken -__v");


    return res.status(200)
                .json(
                    new ApiResponse(200,newData,"Food added to cart successfully")
                );
})


const removeFromCart = asyncHandler(async(req,res)=>{
    const {itemId} = req.body;

    if(!itemId){
        throw new ApiError(400," Food ID is required");
    }

    const user = await User.findById(req.user._id);
    const cart = user.cartData;

    cart[itemId] -= 1;

    if (cart[itemId] <= 0) {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $unset: { [`cartData.${itemId}`]: "" } },
            { new: true }
        ).select("-password -refreshToken -__v");

        return res.status(200).json(
            new ApiResponse(200, updatedUser, "Food removed from cart successfully")
        );
    } else {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { [`cartData.${itemId}`]: cart[itemId] },
            { new: true }
        ).select("-password -refreshToken -__v");

        return res.status(200).json(
            new ApiResponse(200, updatedUser, "Food quantity updated in cart")
        );
    }

    // cartData is name of cart in database
});

const listCart = asyncHandler(async(req,res)=>{
    const cart = req.user.cartData;
    return res.status(200)
                .json(
                    new ApiResponse(200,cart,"Cart items retrieved successfully")
                );
})

export {
    addToCart,
    removeFromCart,
    listCart
}
