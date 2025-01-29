const Task = require('../models/task')

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user })
    res.json(tasks)
}

exports.createTask = async (req, res) => {
    const task = new Task({ ...req.body, user: req.user })
    await task.save()
    res.status(201).json(task)
}

exports.updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(task)
}

exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: 'Task deleted successfully' })
}