import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import User from '../models/user.models.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        if(!user){
            throw new ApiError(404, "User not found")
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
    
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new ApiError(500,"Something went wrong while generating tokens");

    }
}
const registerUser = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    // validate email format and check if email already exists
    if (!validator.isEmail(email)) {
        throw new ApiError(400, 'Invalid email format');
    }
    const existingUser = await User.findOne({email});

    if (existingUser) {
        return res.status(400)
                  .json(new ApiResponse(400,{}, 'User with this email already exists'));
    }

    if( password.length < 8) {
        throw new ApiError(400, 'Please enter a strong password');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({name, email, password: hashedPassword});

    const newUser = await User.findById(user._id).select('-password -__v -refreshToken');

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(newUser._id);

    const options ={
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    }
    return res.status(201)
                .cookie('accessToken', accessToken, options)
                .cookie('refreshToken', refreshToken, options)
                .json(
                    new ApiResponse(201, newUser, 'User registered successfully')
                )

});
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
    }
    if (!validator.isEmail(email)) {
        throw new ApiError(400, 'Invalid email format');
    }

    const user = await User.findOne({email});
    if (!user) {                
        throw new ApiError(401, 'User does not Exist');
    }

    const isMatch = user.isPasswordCorrect(password);

    if (!isMatch) {
        throw new ApiError(401, 'Invalid password');
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const options ={
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    }

    const loggedInUser = await User.findById(user._id).select('-password -__v -refreshToken');

    return res.status(200)
              .cookie('accessToken',accessToken,options)
              .cookie('refreshToken',refreshToken,options)
              .json(new ApiResponse(200, loggedInUser, 'User logged in successfully'));
})

const verifyUser = asyncHandler(async (req, res) => {
  return res.status(200)
            .json(
                new ApiResponse(200,req.user,"User is authenticated")
        );
});

const logout = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(!user){
        throw new ApiError(404, 'User not found');
    }
    user.refreshToken = '';
    await user.save({validateBeforeSave: false});

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:'lax'
    };

    return res.status(200)
              .clearCookie('accessToken', options)
              .clearCookie('refreshToken', options)
              .json(new ApiResponse(200, {}, 'User logged out successfully'));
})


export {loginUser, registerUser, logout, generateAccessAndRefreshToken, verifyUser};

