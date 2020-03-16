const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')
const userScehma = mongoose.Schema({ name: {
    type: String,
    required: true,
    trim: true
},
email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
        if(!validator.isEmail(value)) {
           throw new Error('fjgfggfk')
        }
    }

},
password: {
    type: String,
    required: true,
    minlenght: 7,
    trim: true,
    validate(value) {
        if(value.toLowerCase().includes('password')) {
            throw new Error('password cannot contain passsword')
        }
    }
},
age: {
    type: Number,
    validate(value) {
        if(value<0) {
           throw new Error('ffdjfdd')
        }
    }
},
tokens: [{
    token: {
        required: true,
        type: String
    }
}],
avatar: {
    type: Buffer
}
},{
    timestamps: true
})

userScehma.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField:'owner'
})

userScehma.pre('remove', async function (next) {

    const user = this
    await Task.findOneAndDelete({owner: user._id})
    next()
})

userScehma.pre('save',async function (next) {
    const user = this

   if(user.isModified('password')) {
       user.password = await bcrypt.hash(user.password,8);
   }

   next()
})

userScehma.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userScehma.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({_id:user._id.toString()} , process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token 
} 



userScehma.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email })
    if(!user) {
        throw new Error('uthta hai kya lavde tera')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('uthta hai kya lavde tera part 2')
    }

    return user
}

const User = mongoose.model('User' ,userScehma )

// const me = new User({
//     name:'utkarsh',
//     email: 'utkarsh@',
//     age:27
// })



module.exports = User