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
    
}, {
    versionKey: false 
})


export default model ('book', bookSchema)