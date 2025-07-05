import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    try{
        const {success}= await ratelimit.limit("my-limit-key"); //in case of user authentication user id or user ip address will be used as key

        if(!success){
            return res.status(429).json({"message": "Too many requests, please try again later."});
        }

        next();
    }
    catch(error){
        console.error("Rate limit error", error);
        next(error);
    }
}

export default rateLimiter;