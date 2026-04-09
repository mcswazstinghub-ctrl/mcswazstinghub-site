const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON requests
app.use(express.json());

// Example AI endpoint
app.post('/ai-service', (req, res) => {
    const { request } = req.body;
    console.log('Client request:', request);
    res.json({ response: `AI processed: ${request}` });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
