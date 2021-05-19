import mongoose from "mongoose";
const connection = {};

async function connectDB() {
  if (connection.isConnected) return;
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
