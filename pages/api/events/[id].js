import auth from "middleware/auth";
import connectDB from "../../../middleware/mongodb";
import Event from "../../../models/Event";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            try {
                const event = await Event.findById(req.query.id);

                if(!event) return res.status(400).json({ message: "Event not found" });

                return res.status(200).json(event);
            } catch (err) {
                return res.status(500).json({ message: "Server Error" });
            }
        case "DELETE":
            try {
                const event = await Event.findById(req.query.id);

                const user = await auth(req, res);

                if(!event) return res.status(400).json({ message: "Event not found" });

                if(user._id.toString() !== event.userId.toString()) return res.status(400).json({ message: "You are not allowed to remove the event"});

                await event.remove();

                return res.status(200).json({ message: "Event Successfuly deleted" });
            } catch (err) {
                return res.status(500).json({ message: "Server Error" });
            }
        case "PUT":
            const { name, description, venue, address, performers, time, date } = req.body;
            if (name && description && venue && address && performers && time && date) {
                try {
                    let event = await Event.findById(req.query.id);

                    if(!event) return res.status(400).json({ message: "Event not found" });

                    const user = await auth(req, res);

                    
                    if(user._id.toString() !== event.userId.toString()) return res.status(400).json({ message: "You are not allowed to edit the event"});
                    
                    event = await Event.findByIdAndUpdate(req.query.id, { name, description, venue, address, performers, time, date }, {
                        new: true,
                    });

                    return res.status(200).json(event);
                } catch (err) {
                    return res.status(500).json({ message: "Server Error" });
                }
            } else {
                return res.status(422).send({ message: "Values Incomplete" });
            }
        default: {
                res.setHeader("Allow", ["PUT", "DELETE", "GET"]);
                return res.status(405).json({ message: `Method ${req.method} not allowed` });
            }
    };
};