const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-app').then((res)=>{
    console.log("connected to the database")
}).catch((e)=>{console.log("error occured")});

