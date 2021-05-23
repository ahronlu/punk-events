import connectDB from "../../../middleware/mongodb";
import Event from "../../../models/Event";
import auth from 'middleware/auth';

connectDB();

export default async (req, res) => {
    if (req.method === "GET") {
        try {
            const user = await auth(req, res);

            const events = await Event.find({ userId: user._id });

            if(!events) return res.status(400).json({ message: "We did not found any event related to this user" });

            return res.status(200).json(events);
        } catch (err) {
            return res.status(500).json({ message: "Server Error" });
        }
    } else {
            res.setHeader("Allow", ["PUT", "DELETE", "GET"]);
            res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
};