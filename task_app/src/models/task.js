const mongoose=require('mongoose')
const task =mongoose.model("tasks",{
    Task_name:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean
    }

},{
    timestamps:true
})
module.exports={task};