const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const config = require('config');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming request bodies in a middleware before handlers
app.use(cors()); // Enable CORS

// Configuration settings
const port = config.get('port');
const mongoURI = config.get('mongoURI');
const jwtSecret = config.get('jwtSecret');

// MongoDB Connection
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to TaskSync');
  });
  
  // Routes
const { router: authRouter, auth } = require('./routes/auth');
app.use('/api/auth', authRouter); // Routes for authentication
app.use('/api/tasks', auth, require('./routes/tasks')); // Protected routes for task management

// Socket.io setup
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  console.log('New connection');

  socket.on('taskAdded', task => {
    io.emit('taskAdded', task); // Emit taskAdded event to all clients
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
