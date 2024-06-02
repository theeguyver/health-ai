const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// Connection URI for MongoDB Atlas
const uri = 'mongodb+srv://shreelusantosh0296:2A8bc9ws@cluster0.fw1bfpz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
const port = 4002;

// Database Name
const dbName = 'user_db';

// Collection Name
const collectionName = 'chat_history';

// Connect to MongoDB Atlas
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
    cors({
      origin: '*', 
      methods: ['POST'], // Allow only POST requests
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
    })
);

// API endpoint to add a new chat message
app.post('/addChat', async (req, res) => {
    const { userId, messages } = req.body;
    const timestamp = new Date(); // Generating current timestamp
     // Remove the first element from the messages array
     const shiftedMessage = messages.shift();

    try {
        // Connect to the MongoDB client
        await client.connect();

        // Access the database
        const db = client.db(dbName);

        // Find the user's session
        const userSession = await db.collection(collectionName).findOne({ userId });

        if (userSession) {
            // If the user already has a session, append the new message with timestamp
            const sessionid = generateSessionId(); // Function to generate unique session id
            await db.collection(collectionName).updateOne(
                { userId },
                { $push: { session: { sessionid, sessiondata: messages } } }
            );
        } else {
            // If the user doesn't have a session, create a new one with the first message and timestamp
            const sessionid = generateSessionId(); // Function to generate unique session id
            await db.collection(collectionName).insertOne({ userId, session: [{ sessionid, sessiondata: messages }] });
        }

        res.status(200).json({ message: 'Chat message added successfully', timestamp }); // Sending timestamp in response
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
});

// Function to generate a session id with timestamp
function generateSessionId() {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedTimestamp = `${months[now.getMonth()]}, ${now.getDate()}, ${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}`;
    return formattedTimestamp;
}

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
