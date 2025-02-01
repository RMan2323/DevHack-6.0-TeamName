// In server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Essential middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies

// In itemRoutes.js
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      owner: req.user.id // From auth middleware
    });
    
    await newItem.save();
    res.status(201).json(newItem);
    
  } catch (err) {
    console.error('Item creation error:', err);
    res.status(400).json({ 
      error: 'Validation failed',
      details: err.message 
    });
  }
});
