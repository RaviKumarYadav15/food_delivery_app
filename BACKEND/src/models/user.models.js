import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new Schema({
    name:{type:String,required:true, trim:true, lowercase:true},
    email:{type:String, required:true, unique:true, trim:true, lowercase:true},
    password:{type:String, required:true, trim:true},
    cartData:{type:Object, default:{}},
    refreshToken:{type:String, default:''}
},{timestamps:true, minimize: false});

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
