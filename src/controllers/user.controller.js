import { asyncHandler } from "../utils/asyncHandler.js"

import {ApiError} from "../utils/ApiError.js"

import { User } from "../models/user.models.js"

import { uploadOnCloud } from "../utils/cloudiary.js"

import { ApiResponse } from "../utils/ApiResponse.js"

// Here asyncHandler() is our "Higher order function" and higher order function takes another function as parameter
const registerUser = asyncHandler( async (req, res) => {
   
    const {fullName, email, username, password} = req.body
    console.log('email: ', email);

    // Creating condition to validate that there are no empty properties in the request body.
    if (
        [fullName, email, username, password].some( (field) => field?.trim() === "" )
    ) {
        throw new ApiError(400, "All fields cannot be empty")
    }

    // With this below condition we are checking whether the user already exists, if condition gets true throw an error to user
    const existedUser = User.findOne({
        $or: [{ username }, { email }]    
    })

    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }

    const avtarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avtarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloud(avtarLocalPath)
    const coverImage = await uploadOnCloud(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    // Now creating user
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

   // Method to deselect the password and refreshToken 
   const createdUser = await User.findById( user._id).select(
    "-password -refreshToken"
   )
   
   // Condition to check whether the user is created successfully
   if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering User")
   }

   // Finally sendig response to the user
   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfuly")
   )
})

export {registerUser}