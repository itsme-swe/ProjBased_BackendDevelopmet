import mongoose, {Schema} from "mongoose";      // Here we are destructuring Schema from mongoose.Schema

import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fulllName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,   // cloudinary url
            required: true,
        },
        coverImage: {
            type: String,

        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            requred: [true, 'Password is required'],

        },
        refreshToken: {
            type: String
        }
    },{timestamps: true})

// pre hooks
userSchema.pre('save', async function(next){

    if (!this.isModified('password')) return next()     // condition to check if password field is not modified then pass to the next middeware if modified then execute the below encryption 

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Here we are creating our own custom method by using bcrypt library

userSchema.methods.isPasswordCorrect = async function(password){
    // Writing condition to check the password entered by the user and the password stored in our database are same or not with the help of bcrypt library

    return await bcrypt.compare(password, this.password)     // Here "this.password" is encrypted password one stored in our db
} 
/*🔸Overall this upper custom function will return boolean value */

// Here we are creating custom method to generate token with the help of jsonwebtoken library
userSchema.methods.generateAccessToken = function() {
    return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    jwt.sign(
        {
            _id: this.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema)