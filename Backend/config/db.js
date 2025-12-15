const mongoose = require("mongoose"); // Importing mongoose to interact with MongoDB

const connectDB = async () => { // Declaring an async function to connect to the database
  try { // Try block to attempt the database connection
    await mongoose.connect("mongodb://127.0.0.1:27017/appointmentsDB", { // Connecting to MongoDB using the local URL
      useNewUrlParser: true, // Enables the new URL parser
      useUnifiedTopology: true, // Uses the new server discovery & monitoring engine
    });
    console.log("MongoDB connected"); // Logs success message when connected
  } catch (error) { // Catch block runs if connection fails
    console.error("MongoDB connection error", error.message); // Logs the error message
    process.exit(1); // Exits the app with status code 1 (failure)
  }
};

module.exports = connectDB; // Exporting the connectDB function for use in other files
