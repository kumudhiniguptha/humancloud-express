const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper (async (req, res)=>{
    // res.send('Here are all the tasks you should perform today...')
        const tasks = await Task.find({})
        // res.status(200).json({tasks})
        res.status(200).json({tasks, amount:tasks.length})
})

const createTask = asyncWrapper(async (req, res)=>{
        const task = await Task.create(req.body)
        res.status(201).json({task})

})

const getTask = asyncWrapper(async (req, res, next)=>{
    // res.json({id:req.params.id})
        const taskID = req.params.id
        const task = await Task.findOne({_id:taskID }).exec()
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req, res)=>{
    // res.send('Update Task')
        const taskID = req.params.id
        const data = req.body
        const task = await Task.findByIdAndUpdate({_id:taskID}, data, {
            new: true,
            runValidators: true
        })
        
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }

        res.status(200).json({task}) 
})

const deleteTask = asyncWrapper(async (req, res)=>{
    // res.send('Delete Task')
        const taskID = req.params.id
        const task = await Task.findByIdAndDelete({_id:taskID});
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({task})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}