

require('../db/mongoose')

const User = require('../models/user')

// User.findByIdAndUpdate('5e521fd1baa42f1faf8f5bf1', {age:1}).then((result)=> {
//     console.log(result)
//     return User.countDocuments({age:1})
// }).then((user)=> {
//     console.log(user)
// }).catch((e)=>console.log(e))


const updateByIdandcount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}


updateByIdandcount('5e521fd1baa42f1faf8f5bf1', 2).then((result)=> {
    console.log(result)
}).catch((e)=> console.log(e))