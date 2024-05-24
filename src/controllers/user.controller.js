import { asyncHandler } from "../utils/asyncHandler.js"

// Here asyncHandler() is our "Higher order function" and higher order function takes another function as parameter
const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})

export {registerUser}