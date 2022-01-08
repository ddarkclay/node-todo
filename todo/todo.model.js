const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Todos', todoSchema)