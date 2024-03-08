import {Schema , model} from 'mongoose'

const userSchema = Schema({
    name: {
        type:String,
        required : [true, 'name is required']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required']
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        required: [true, 'username is required']
    },
    password:{
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: [true, 'password is required']
    },
    email:{
        type: String,
        required: [true, 'email is required']
    },
    phone: {
        type: String,
        minLength: 8,
        mnaxLength: 8,
        required: [true, 'phone is required']
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT'],
        required: [true, 'role is required']
    },
    item:[{
        book:{
            type: Schema.Types.ObjectId,
            ref: 'book',
            required: [true, 'user is required']
        }
    }]
}, {
        versionKey: false 
    })



export default model ('user', userSchema)