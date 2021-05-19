import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookie from "cookie";
import User from "../../models/User";
import connectDB from "../../middleware/mongodb";

connectDB();

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(422).json({ message: "Invalid Credentials" });
    }

    try {
      // 1) check to see if a user exists with the provided email
      const user = await User.findOne({ email }).select("+password");
      // 2) --if not, return error
      if (!user) return res.status(404).json({ message: "No user exists with that email" });
      // 3) check to see if users" password matches the one in db
      const passwordsMatch = await bcrypt.compare(password, user.password);
      // 4) --if so, generate a token
      if (passwordsMatch) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        // 5) send that token to the client
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "Passwords do not match" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    re.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};