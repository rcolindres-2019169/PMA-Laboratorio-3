import {Schema, model} from 'mongoose'

const bookSchema = Schema({
    name: {
        type:String,
        required : [true, 'name is required']
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'category is required']
    },
    items: [{
        user:{
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'user is required']
        }
    }]
}, {
    versionKey: false 
})


export default model ('book', bookSchema)