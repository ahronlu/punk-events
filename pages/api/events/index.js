import connectDB from "../../../middleware/mongodb";
import Event from "../../../models/Event";

const handler = async (req, res) => {
    switch (req.method) {
        case "GET":
            try {
                const events = await Event.find();
                return res.status(200).json(events);
            } catch (error) {
                return res.status(500).json({ message: "Server Error"});
            }
        case "POST":
            console.log(req.body)
            const { name, description, venue, address, performers, time, date } = req.body;
            if (name && description && venue && address && performers && time && date) {
                try {
                    var event = new Event({
                        name, description, venue, address, performers, time, date
                    });

                    console.log('data complete')
                    const eventcreated = await event.save();
                    return res.status(200).json(eventcreated);
                } catch (error) {
                    return res.status(500).json({ message: error.message });
                }
            } else {
                return res.status(422).send({ message: "data incomplete" });
            }
        default: {
                return res.status(405).json({ message : "req method not supported" });
            }
    };
}

export default connectDB(handler);