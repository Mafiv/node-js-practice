const express=require('express');
const student_router=require('./student')
const task_router=require('./task')
const port=process.env.PORT || 3000;
const jwt=require('jsonwebtoken')
const app=express();
const task=require('../models/task')
const {student}=require('../models/student')
app.use(express.json());
app.use(student_router);
app.use(task_router);
// const aa=async ()=>{
//     const lel=await task.findById("660bffccdc13a119653ae341");
//     await lel.populate('owner')
//     console.log(lel)
// }
// aa()

const sd=async()=>{
    const ll=await student.findById('6606c927d93f32e923c1a589');
    await ll.populate('tasker')
    console.log(ll.tasker)
}

app.listen(port,()=>{console.log("server running")})