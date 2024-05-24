//◽Method 1 :- Promise asyncHandler function

const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export {asyncHandler}




//◽Method 2 :- try() & catch() asyncHandler function

/*
const asyncHandler = (fn) => async (err, req, res, next) => {
    try {
        await fn(err, req, res, next)
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
*/