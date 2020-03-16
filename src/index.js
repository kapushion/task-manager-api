const express = require('express')
require('./db/mongoose')
const app = express()

const userRouter = require('./routers/user')

const taskRouter = require('./routers/task')
const port = process.env.PORT 


const multer = require('multer')
const upload = multer({
    dest: 'images',
    limit: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {

        if(!file.originalname.match(/\.(doc|docx)$/)) {
          return cb(new Error('Please upload a word document'))
        }

        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'),(req,res)=> {
    res.send()
})

app.use(express.json())
app.use(userRouter)

app.use(taskRouter)

// const bcrypt = require('bcryptjs')


app.listen(port, ()=> console.log('server is up on '+ port))

const Task = require('./models/tasks')
const User = require('./models/user')

// const myFunc = async () => {
//     const password = 'atrerocks123'
//     const epass = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(epass)

//     const isokay = await bcrypt.compare('atrerocks123', epass)

//     console.log(isokay)

//     const token = jwt.sign({_id: 'abc123'}, 'thisismycourse',{expiresIn: '7 days'})

//    const verify = jwt.verify(token, 'thisismycourse')

//    console.log(token)
//    console.log(verify)

//     const task = await Task.findById('5e66184561e3747d8b3d6b5a')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)


// }

// myFunc()