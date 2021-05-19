// import mongoose from 'mongoose';

// const connectDB = handler => async (req, res) => {
//   if (mongoose.connections[0].readyState) {
//     // Use current db connection
//     return handler(req, res);
//   }
//   // Use new db connection
//   await mongoose.connect(process.env.mongodburl || "mongodb+srv://koftov:koftovkoftov@cluster0-4e7ky.mongodb.net/events?retryWrites=true&w=majority", {
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//     useNewUrlParser: true
//   });
//   return handler(req, res);
// };

// export default connectDB;

import mongoose from "mongoose";
const connection = {};

async function connectDB() {
  if (connection.isConnected) {
    // Use existing database connection
    console.log("Using existing connection");
    return;
  }
  // Use new database connection  
  const db = await mongoose.connect(process.env.mongodburl || "mongodb+srv://koftov:koftovkoftov@cluster0-4e7ky.mongodb.net/events?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("DB Connected");
  connection.isConnected = db.connections[0].readyState;
}

export default connectDB;
