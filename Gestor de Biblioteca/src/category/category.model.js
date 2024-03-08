import {Schema, model} from 'mongoose'

const categorySchema = Schema({
    name:{
        type: String,
        required: [true, 'name is required']
    },
    description:{
        type: String,
        required: [true, 'description is required']
    }
}, {
    versionKey: false 
})


export default model ('category', categorySchema)