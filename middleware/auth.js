import jwt from "jsonwebtoken";
import User from "models/User";
import connectDB from "./mongodb";

connectDB();

export default async (req, res, next) => {
    console.log(req.headers)
    // const { userId }  = (jwt.verify(
    //     req.headers.authorization.split(' ')[1],
    //     process.env.JWT_SECRET
    // ));
    try {
        // const user = await User.findById(userId)
        // console.log(user)

        // if(!user) return res.status(403).json({ message: "User not found "})

        // req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}