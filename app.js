const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config');

const app = express()

// Middleware
app.use(bodyParser.json());

// Import Routes
const todosRoute = require('./todo/todo.route')

// Route Middleware
app.use('/todos', todosRoute)

app.get('/', (req, res) => {
    res.send('home call')
})

console.log('db : ', process.env.DB_CONNECTION)

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Db connected');
    });

app.listen(8000)