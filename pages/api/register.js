import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookie from "cookie";
import User from "../../models/User";
import connectDB from "../../middleware/mongodb";

connectDB();

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    if(!email || username.length < 2 ||password.length < 6) return res.status(422).json({ message: "Invalid Credentials" });

    try {
      const user = await User.findOne({ email });
      if (user) return res.status(422).send(`User already exists with that email ${email}`);
      // 3) --if not, hash their password
      const hash = await bcrypt.hash(password, 10);
      // 4) create user
      const newUser = await new User({
        username,
        email,
        password: hash,
      }).save();
      // 6) create token for the new user
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

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

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }



  } else {
    re.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};