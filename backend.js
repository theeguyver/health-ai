'use strict';
const express = require('express');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000; // Or any port you prefer
const uri = 'YOUR_MONGODB_URI'; // MongoDB URI
const client = new MongoClient(uri);

app.use(express.json());
// Configure cors middleware with specific options
app.use(
    cors({
      origin: '*', 
      methods: ['GET', 'POST'], // Allow only GET and POST requests
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
    })
  );

// Function to generate salt
const generateSalt = (rounds) => {
    if (rounds >= 15) {
        throw new Error(`${rounds} is greater than 15, Must be less than 15`);
    }
    if (typeof rounds !== 'number') {
        throw new Error('rounds param must be a number');
    }
    if (rounds == null) {
        rounds = 12;
    }
    return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
};

// Function to hash password
const hasher = (password, salt) => {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return value;
};

// Function to hash password with provided salt
const hashPassword = (password, salt) => {
    if (password == null || salt == null) {
        throw new Error('Must Provide Password and salt values');
    }
    if (typeof password !== 'string' || typeof salt !== 'string') {
        throw new Error('password must be a string and salt must either be a salt string or a number of rounds');
    }
    return hasher(password, salt);
};

// Function to compare password with its hash
const comparePasswords = async (password, hashedPasswords) => {
    for (const hashObj of hashedPasswords) {
        const hashedPassword = hashPassword(password, hashObj.salt);
        if (hashedPassword === hashObj.hashedpassword) {
            return true; // Match found
        }
    }
    return false; // No match found
};

// Middleware for MongoDB connection
const connectMongoDB = async (req, res, next) => {
    try {
        await client.connect();
        req.dbClient = client;
        next();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Middleware to close MongoDB connection
const closeMongoDB = async (req, res, next) => {
    if (req.dbClient) {
        await req.dbClient.close();
    }
    next();
};

// Registration Endpoint
app.post('/register', connectMongoDB, async (req, res) => {
    const { email, password, name, phone, age, gender } = req.body;
    const salt = generateSalt(12);
    const hashedPassword = hashPassword(password, salt);
    const collection = req.dbClient.db('user_db').collection('user_credentials');

    try {
        // Check if email already exists in the database
        const existingUser = await collection.findOne({ email: email });
        if (existingUser) {
            // If email already exists, return an error message
            return res.status(400).json({ error: 'Email already registered' });
        }

        // If email does not exist, insert the new user
        await collection.insertOne({
            email: email,
            name: name,
            phone:phone,
            age:age,
            gender:gender,
            hashedpassword: hashedPassword,
            salt: salt
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Authentication Endpoint
app.post('/login', connectMongoDB, async (req, res) => {
    const { email, password } = req.body;
    const collection = req.dbClient.db('user_db').collection('user_credentials');

    try {
        const hashedPasswords = await collection.find({ email }, { projection: { hashedpassword: 1, salt: 1 } }).toArray();
        const isMatch = await comparePasswords(password, hashedPasswords);
        if (isMatch) {
            res.json({ data: 'Authentication successful' });
        } else {
            res.status(401).json({ data: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error authenticating user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
