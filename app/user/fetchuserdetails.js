// Node.js server code

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();

// MongoDB Atlas connection URI
const uri = 'YOUR_MONGODB_URI';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.json());
// Configure cors middleware with specific options
app.use(
    cors({
      origin: '*', 
      methods: ['GET', 'POST'], // Allow only GET and POST requests
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
    })
  );

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

async function connectToMongoDB() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        const database = client.db('user_db');
        const userDetailsCollection = database.collection('user_credentials');

        // Route to fetch user details by email
        app.get('/userdetails', async (req, res) => {
            const email = req.query.email;
        
            if (!email) {
                return res.status(400).json({ error: 'Email parameter is required' });
            }
        
            try {
                const userDetails = await userDetailsCollection.find({ email }).toArray();
                if (userDetails.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(userDetails);
            } catch (err) {
                console.error('Error fetching user details:', err);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        app.listen(3002, () => {
            console.log('Server is running on port 3002');
        });
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
    }
}

connectToMongoDB();
