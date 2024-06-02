const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3004;

// MongoDB Atlas connection URI
const uri = 'YOUR_MONGODB_URI';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Configure cors middleware with specific options
app.use(
    cors({
      origin: '*', 
      methods: ['GET', 'POST'], // Allow only GET and POST requests
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
    })
  );

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder for file uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Set the file name
    }
});

const upload = multer({ storage: storage });

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
    }
}

connectToMongoDB();

// Route to handle profile photo upload
app.post('/uploadphoto', upload.single('profilePhoto'), async (req, res) => {
    try {
        // Get the file path of the uploaded photo
        const filePath = req.file.path;
        // You can optionally save the file path in your MongoDB database
        // Here's an example of how you might do it:
        const database = client.db('user_db');
        const userDetailsCollection = database.collection('user_credentials');
        const email = req.query.email; // Assuming email is passed as a query parameter
        await userDetailsCollection.updateOne({ email }, { $set: { profilePhoto: filePath } });

        res.json({ url: filePath }); // Return the file path or URL to the client
    } catch (error) {
        console.error('Error uploading profile photo:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
