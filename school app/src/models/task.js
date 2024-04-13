const { ObjectId } = require('mongodb')
const mongoose=require('mongoose')
const task_sch=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    owner:{
        // type:mongoose.Schema.type.ObjectId,
        type:String,
        required:true,
        ref:'students'
    },
    completed:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
})
const task=mongoose.model('task',task_sch);

module.exports=task