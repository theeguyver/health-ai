// server.js

const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require('cors');

const app = express();
const PORT = 3003;
const MONGODB_URI = "mongodb+srv://shreelusantosh0296:2A8bc9ws@cluster0.fw1bfpz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());

// Connect to MongoDB Atlas
const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
// Configure cors middleware with specific options
app.use(
    cors({
      origin: '*', 
      methods: ['GET', 'POST'], // Allow only GET and POST requests
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
    })
  );

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

connect();

// Define API endpoints

// Fetch therapists
app.get("/therapists", async (req, res) => {
  try {
    const db = client.db("therapist_db"); // Replace "your-database-name" with your actual database name
    const therapistsCollection = db.collection("therapist_details"); // Replace "therapists" with your collection name

    const therapists = await therapistsCollection.find({}).toArray();
    res.json(therapists);
  } catch (error) {
    console.error("Error fetching therapists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
