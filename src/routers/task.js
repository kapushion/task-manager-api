const express = require('express')
const auth = require('../../middlewares/auth')
const Task = require('../models/tasks')
const User = require('./user')
const router = new express.Router()

router.post('/tasks', auth,async (req,res)=> {
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })

    try{
       await task.save()
    res.status(201).send(task)

    } catch(e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth, async (req,res)=> {
    const match = {}
    const sort = {}
    
    if(req.query.completed) {
        
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const user = await User.findById('5e662d4cc6188c59ab21de16')
        // await user.populate('tasks').execPopulate()
        // res.send(user.tasks)
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send()
    }
})


router.get('/tasks/:id',auth ,async (req,res)=> {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
   
})



router.patch('/tasks/:id' , auth,async (req,res)=> {
    const updates = Object.keys(req.body)
    const allowed = ['description','completed']
    const isValid = updates.every((update)=> allowed.includes(update))
    if(!isValid) {
        return res.status(400).send()
       
    }

    try {
        const task =  await Task.findOne({_id: req.params.id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()
        }
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
        res.send(task)

    } catch(e) {
        res.status(400).send(e)

    }
})



router.delete('/tasks/:id',auth, async (req,res) => {
    
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user.id})  
        if(!task) {
           return res.status(404).send()
        }

        res.send(task)

    } catch(e) {
        res.status(500).send()
    }
})




module.exports = router
