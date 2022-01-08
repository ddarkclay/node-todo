const express = require('express')
const router = express.Router();
const Todo = require('../todo/todo.model')

router.post('/', async (req, res) => {
    const todo = new Todo({
        todo: req.body.todo
    })
    try {
        const savedTodo = await todo.save()
        res.status(201).json({ message: "Todo save successfully", data: savedTodo })
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// All todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json({ message: "Todos get successfully", data: todos })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// Get Specific todo
router.get('/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId)
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// Delete todo
router.delete('/:todoId', async (req, res) => {
    try {
        const todo = await Todo.remove({ message: "Todo delete successfully", data: { _id: req.params.todoId } })
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})


// Update a post
router.patch('/:todoId', async (req, res) => {
    try {
        const updatedTodo = await Todo.updateOne(
            { _id: req.params.todoId },
            { $set: { todo: req.body.todo } })
        res.status(200).json({ message: "Todo update successfully", data: updatedTodo })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// toggle todo
router.get('/toggle/:todoId', async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.todoId)
        todo.status = !todo.status
        todo = await todo.save()
        res.status(200).json({ message: "Todo status update successfully", data: todo })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router;