const mongoose=require('mongoose')
const user=mongoose.model("users",{
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        default:"12345678",
        min_length:8
    }

})
module.exports={user};

