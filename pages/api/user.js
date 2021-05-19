import jwt from "jsonwebtoken"; 
import cookie from "cookie";


export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) return res.status(403).json({ message: "Not Authorized" });

    const { token } = cookie.parse(req.headers.cookie);

    console.log(token)

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    // Verify token
    try {
      jwt.verify(token, process.env.jwtSecret, (error, decoded) => {
        if (error) {
          return res.status(401).json({ msg: 'Token is not valid' });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } catch (err) {
      console.error('something wrong with auth middleware');
      res.status(500).json({ msg: 'Server Error' });
    }
  } else {
    re.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
