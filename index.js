const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const path = require('path');
// Loading environment variables
require('dotenv').config();
var cors = require("cors");
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Define port from environment variables with a fallback
const port = process.env.PORT || 3005;

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true

})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema for the register form
const registerSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Creating a model from the schema
const Register = mongoose.model("Register", registerSchema);

// GET API endpoint to retrieve all data from the database
app.get("/list", async (req, res) => {
  try {
    const data = await Register.find({});
    res.json(data); // Sending JSON response with the retrieved data
  } catch (err) {
    res.status(500).json({ error: err.message }); // Sending an error response if something goes wrong
  }
});

// Server listening
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
