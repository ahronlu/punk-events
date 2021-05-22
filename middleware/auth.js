import jwt from "jsonwebtoken";
import User from "models/User";
import { parseCookies } from "../helpers";

export default async (req, res) => {
    const { token } = parseCookies(req);

    if(!token) return res.status(400).json({err: 'Invalid Authentication.'})

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    if(!userId) return res.status(400).json({err: 'Invalid Authentication.'})

    const user = await User.findById(userId).select("-password");

    return user;
}
