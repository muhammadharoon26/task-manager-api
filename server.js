require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const http = require('http')
const { Server } = require('socket.io')

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('User connected')
    socket.on('disconnect', () => console.log('User disconnected'))
})

app.post('/task', async (req, res) => {
    const task = new Task({ ...req.body, user: req.user })
    await task.save()
    io.emit('newTask', task)
    res.status(201).json(task)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
