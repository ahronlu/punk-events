import jwt from 'jsonwebtoken';
import connectDB from "../../../middleware/mongodb";
import Event from "../../../models/Event";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            try {
                const { userId }  = (jwt.verify(
                    req.headers.authorization.split(' ')[1],
                    process.env.JWT_SECRET
                  ));
                const events = await Event.find({ userId });
                if(!events) return res.status(400).json({ message: "Event not found" });
                return res.status(200).json(events);
            } catch (error) {
                res.status(500).json({ message: "Server Error" });
            }
            break
        case "DELETE":
            try {
                const event = await Event.findById(req.query.id);
                if(!event) return res.status(400).json({ message: "Event not found" });
                await event.remove();
                return res.status(200).json({ message: "Event Successfuly deleted" });
            } catch (error) {
                res.status(500).json({ message: "Server Error" });
            }
        case "PUT":
            const { name, description, venue, address, performers, time, date } = req.body;
            if (name && description && venue && address && performers && time && date) {
                try {
                    let event = await Event.findById(req.query.id);
                    if(!event) return res.status(400).json({ message: "Event not found" });
                    event = await Event.findByIdAndUpdate(req.query.id, { name, description, venue, address, performers, time, date }, {
                        new: true,
                    });

                    return res.status(200).json(event);
                } catch (error) {
                    return res.status(500).json({ message: "Server Error" });
                }
            } else {
                res.status(422).send({ message: "Values Incomplete" });
            }
            break
        default: {
                re.setHeader("Allow", ["PUT", "DELETE", "GET"]);
                res.status(405).json({ message: `Method ${req.method} not allowed` });
            }
    };
};