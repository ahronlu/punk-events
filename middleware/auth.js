import jwt from "jsonwebtoken";
import User from "models/User";
import { parseCookies } from "../helpers";

export default async (req, res) => {
    let { token } = parseCookies(req);

    console.log(token)

    if(!token) {
        // token = req.headers.authorization.split(' ')[1];
        if(!token)  return res.status(400).json({err: 'Invalid Authentication.'});
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    if(!userId) return res.status(400).json({err: 'Invalid Authentication.'})

    const user = await User.findById(userId).select("-password");

    if(!user) return res.status(400).json({err: 'Invalid Authentication.'})

    return user;
}
