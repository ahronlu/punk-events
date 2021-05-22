import jwt from "jsonwebtoken"; 
import cookie from "cookie";
import auth from "middleware/auth";
import User from "models/User";
import connectDB from "middleware/mongodb";

connectDB();

export default async (req, res) => {
  if (req.method === "GET") {
    // console.log(req.method)
    // if (!req.headers.cookie) return res.status(403).json({ message: "Not Authorized" });

    // const { token } = cookie.parse(req.headers.cookie);


    // if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    //   const { userId }  = (jwt.verify(
    //     token,
    //     process.env.JWT_SECRET
    // ));
    // Verify token
    try {
        // const user = await User.findById(userId).select("-password");
        // if(!user) res.status(403).json({ message: "User forbidden" });
        const user = await auth(req, res);
        req.user = user;
        res.status(200).json({ user });
        console.log(user)
        return user;
    } catch (err) {
      console.error("something wrong with auth middleware",err);
      res.status(500).json({ msg: 'Server Error' });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};