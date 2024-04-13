const express=require('express');
require('./src/models/connection')
const {user}=require('./src/models/user')
const {task} = require('./src/models/task');
const { ObjectId } = require('mongodb');
const app=express()
const port=process.env.PORT ||3000;
app.use(express.json());



app.post('/adduser',(req,res)=>{
    const me= new user(req.body)
    
    me.save().then(()=>{
        res.send("suessfully sent")
    }).catch((e)=>{
        res.send(e.message)
    })

})

app.post('/addtask',(req,res)=>{
    const current = new task(req.body)
    current.save().then(()=>{
        res.send(current)
    }).catch((e)=>{res.send(e.message)})
})


app.get('/readuser/:name',async (req,res)=>{
    try{
    const ans = await task.find({Task_name:req.params.name})
    
    }
    catch(e){
        res.send(e)
    }
})


app.patch('/update/:name',async(req,res)=>{
    try{
    const allowed_update=["name","email","Taskname"]
    const req_updates = Object.keys(req.body)
    const verify =req_updates.every((update)=>{
        return allowed_update.includes(update) 
    })

    if(!verify){
        return res.status(400).send("invalid update")
    }

    
    

    res.send(verify);
    // const changed=req.body
    // const realy= await task.findOneAndUpdate({Task_name:req.params.name},{completed:true})
    // res.send(realy)
    }catch(e){res.send(e)}
})



app.listen(port,()=>{
    console.log("server is running");
})



