import connectDB from "../../../middleware/mongodb";
import Event from "../../../models/Event";
import auth from "middleware/auth";

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            try {
                const events = await Event.find();

                return res.status(200).json(events);
            } catch (err) {
                return res.status(500).json({ message: "Server Error"});
            }
        case "POST":
            const user = await auth(req, res);

            const { name, description, venue, address, performers, time, date } = req.body;

            if (name && description && venue && address && performers && time && date) {
                try {
                    var event = new Event({
                        name, description, venue, address, performers, time, date, userId: user._id
                    });

                    const eventcreated = await event.save();
                    
                    return res.status(200).json(eventcreated);
                } catch (err) {
                    return res.status(500).json({ message: "Server Error" });
                }
            } else {
                return res.status(422).send({ message: "data incomplete" });
            }
        default: {
                res.setHeader("Allow", ["POST", "GET"]);
                res.status(405).json({ message: `Method ${req.method} not allowed` });
            }
    };
}