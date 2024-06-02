const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

import('node-fetch').then(({ default: fetch }) => {
    // Your code that uses fetch goes here
    const app = express();
    const PORT = 2000;

    // Initialize messages array
    let messages = [
        { role: 'system', content: "You are a helpful, smart, kind, and efficient AI assistant. You always fulfill the user's requests to the best of your ability." }
    ];
    
    // Middleware to parse JSON bodies
    app.use(bodyParser.json());
    
    app.use(express.json());
    // Configure cors middleware with specific options
    app.use(
        cors({
          origin: '*', 
          methods: ['GET', 'POST'], // Allow only GET and POST requests
          allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
        })
      );
    
    // Express endpoint to receive messages and interact with LLM endpoint
    app.post('/chatresponse', async (req, res) => {
        try {
            // Extract user message from the request
            const userMessage = req.body.content;
        
            // Append user message to messages array
            messages.push({ role: 'user', content: userMessage });
        
            // Prepare data for LLM endpoint
            const requestData = {
                messages: messages,
                temperature: 0.7,
                max_tokens: -1,
                stream: false
            };
        
            // Send request to LLM endpoint
            const llmResponse = await fetch('http://localhost:1234/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
        
            // Parse LLM response
            const llmData = await llmResponse.json();
        
            // Extract response from LLM choices
            const llmResponseContent = llmData.choices[0].message.content;
        
            // Append LLM response to messages array
            messages.push({ role: 'assistant', content: llmResponseContent });
        
            // Send the response back to the user
            res.json({ response: llmResponseContent });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Express endpoint to handle ending session
    app.post('/endsession', (req, res) => {
        try {
            // Retrieve email from request body
            const userEmail = req.body.userEmail; 
            
            // Send a POST request to http://localhost:4002/addChat
            fetch('http://localhost:4002/addChat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userId": userEmail,
                    "messages": messages
                }),
            });

            // Reinitialize the messages array
            messages = [
                { role: 'system', content: "You are a helpful, smart, kind, and efficient AI assistant. You always fulfill the user's requests to the best of your ability." }
            ];

            // Send back a response with body: { message: "Session Ended." }
            res.json({ message: "Session Ended." });
        } catch (error) {
            console.error('Error ending session:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to import node-fetch:', err);
});
