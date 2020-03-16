// 5e501b146de40a74191256bd

require('../db/mongoose')

const Task = require('../models/tasks')

// Task.findByIdAndDelete('5e501b146de40a74191256bd').then( ()=> {
//     console.log('deleted')
//     return Task.find({ completed: false })
// }).then((users)=> {
//     console.log(users)
// }).catch((e)=> {
//     console.log(e)
// })


const deleteByIdandcount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}


deleteByIdandcount('5e501b146de40a74191256bd', false).then((result)=> {
    console.log(result)
})
.catch((e)=> console.log(e))