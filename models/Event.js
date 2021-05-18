import mongoose from "mongoose";

const { String, Number } = mongoose.Schema.Types;

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  performers: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

mongoose.models = {};

const Event = mongoose.model('Event', EventSchema);


export default Event;