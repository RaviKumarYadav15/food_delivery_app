import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Food from "../models/food.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/Cloudinary.js";

const addFood = asyncHandler(async(req,res)=>{
    const {name, description, price, category} = req.body;
    // validation
    if([name,description, price, category].some(field => field.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }
    
    const existedFood = await Food.findOne({ name });
    if (existedFood) {
        throw new ApiError(400, "Food item already exists");
    }

    if (isNaN(price) || price <= 0) {
        throw new ApiError(400, "Price must be a valid number greater than zero");
    }

    console.log(req.file);
    const foodImageLocalPath = req.file?.path;
    if (!foodImageLocalPath) {
        throw new ApiError(400, "Image file is required");
    }

    let foodImage;
    try{
        foodImage = await uploadOnCloudinary(foodImageLocalPath);
    }catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new ApiError(500, "Failed to upload image");
    }

    try {
        const food = await Food.create({
            name,
            description,
            price,
            category,
            image: {
                url:foodImage?.url ||" ",
                public_id: foodImage?.public_id || " "
            }
        });
            res
                .status(201)
                .json(
                    new ApiResponse(201,food,"Food added successfully")
                );
    } catch (error) {
            console.error("Error adding food:", error);
            throw new ApiError(500, "Failed to add food item");
    }
})

const listFood = asyncHandler(async (req, res) => {
    const foods = await Food.find({});

    return res.status(200).json(
        new ApiResponse(
            200,
            foods,
            foods.length === 0
                ? "No food items found"
                : "Food items retrieved successfully"
        )
    );
});

const removeFood = asyncHandler(async(req, res) => {

    const {id}=(req.params || req.body) || {}   ;
    if (!id) {
        throw new ApiError(400, "Food ID is required");
    }

    const food = await Food.findByIdAndDelete(id);

    if (!food) {
        throw new ApiError(404, "Food item not found");
    }

    const publicId = food.image?.public_id;
    if(publicId){
        try {
            await deleteFromCloudinary(publicId);
            console.log("Image Deleted From Cloudinary");
        } catch (error) {
            console.log("Clodinary image deletion Failed",error)
        }
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200, null, "Food item removed successfully")
            );
});

export {
    addFood,
    listFood,
    removeFood
}; 