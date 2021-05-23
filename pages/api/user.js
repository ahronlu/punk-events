import jwt from "jsonwebtoken"; 
import cookie from "cookie";
import auth from "middleware/auth";
import User from "models/User";
import connectDB from "middleware/mongodb";

connectDB();

export default async (req, res) => {
  if (req.method === "GET") {
    try {
        const user = await auth(req, res);

        req.user = user;

        return res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};