require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const itemRoutes = require('./routes/itemRoutes'); // Import item routes
const carpoolRoutes = require('./routes/carpoolRoutes'); // Import carpool routes

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  credentials: true,
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Use Routes
app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/items', itemRoutes); // Use item routes
app.use('/api/carpool', carpoolRoutes); // Use carpool routes

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
