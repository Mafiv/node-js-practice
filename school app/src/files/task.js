const express=require('express');
require('../models/database_connection');
const  task=require('../models/task');
const { default: mongoose } = require('mongoose');
const bcript=require('bcrypt')
const auth=require('../middleware/auth')
const {student}=require('../models/student')
const task_r=new express.Router()

task_r.post('/addtask',auth,async(req,res)=>{
    const task_sample=new task({...req.body,owner:req.user._id})
    
    await task_sample.populate('owner')
    try{
        await task_sample.save()
        res.send(task_sample)}
    catch(e){
        res.send(e)
    }
})

task_r.get('/findtask/:id',auth,async(req,res)=>{
    const _id=req.params.id;
    try{
    const tt=await task.findById(_id)
    await tt.populate('owner')
    res.send(tt)}
    catch(e){
        res.send(e)
    }
    //,owner:req.user._id
})  

task_r.get('/byuser',auth,async(req,res)=>{
    const user_s=await student.findById(req.user._id)
    await user_s.populate('tasker')
    res.send(user_s.tasker)
})

task_r.get('/fromuser',auth,async(req,res)=>{
    const match={}
    const sort={};

    if(req.query.completed){

    match.completed=req.query.completed==='true'

    }

    if(req.query.sortby){
        const parts=req.query.sortby.split(':')
        sort[parts[0]]=parts[1]==='desc'?-1:1; 
    }

    await req.user.populate({
        path:'tasker',
        match,
        options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
        }
    })
    res.send(req.user.tasker)
})

task_r.patch('/updatetask/:id',async(req,res)=>{
    const allowed=["description"];
    const requested=Object.keys(req.body)
    const verify=requested.every((update)=>{
        return allowed.includes(update)
    })
    if(!verify){
        return res.send("invalid update")
    }
    try{
        const wanted=await task.findOne({_id:req.params.id})
        requested.forEach((update)=>{
            wanted[update]=req.body[update]
        })
        await wanted.save()
        res.send(wanted)
        }catch(e){
    res.send(e)
        }
    })

    task_r.delete('/delete/:id',async(req,res)=>{
        const _id=req.params.id
        const want=await task.find({_id})
        res.send(want)
    })



/*
task_r.post('/add',async(req,res)=>{
    const student_sample=new student(req.body);
    await student_sample.save()
    const token_sample=await student_sample.generateAuthToken();
    res.send({student_sample,token_sample})
})

router.get('/findstudents',auth,async(req,res)=>{
    const student_wanted= await student.find(req.body)
    if(!student_wanted){
        return res.send("not found")
    }
    // res.send(student_wanted);
})

router.patch('/update/:id',async(req,res)=>{
    const allowed_updates=["name","email","password"]
    const req_update=Object.keys(req.body)
    const verify=req_update.every((update)=>{
        return allowed_updates.includes(update)
    })
    if(!verify){
        return res.send("invalid update")
    }
    
    const _id=req.params.id
    const stu=await student.findById(_id);
    req_update.forEach((update)=>{
        stu[update]=req.body[update]
    })
    await stu.save()
    res.send(stu)
})

router.delete('/delete/me',auth,async(req,res)=>{
    try{
        const us=student.findByIdAndDelete(req.user._id)
        res.send(us)
    }catch(e){res.send(e.message)}
}
)


router.get('/login',async(req,res)=>{
    try{
    const user=req.body.email;
    const password=req.body.password
    const check=await student.getbycredential(user,password);
    if(check.email==user){
    const gen=await check.generateAuthToken();
    
    res.status(200).send({check,gen})
    }
    else{
        res.send(check)
    }}
    catch(e){
        res.send(e.message)
    }
})

router.get('/user',auth,async(req,res)=>{
    const usr=await student.findOne({name:"miraf amare"});
    
    res.send(usr)
})


router.post('/logout',auth ,async(req,res)=>{
    req.user=req.user.Tokens.filter((tk)=>{
        return tk.token !==req.token
    })    
    await req.user.save();
    res.send(req.user)
})

router.post('/logoutAll',auth ,async(req,res)=>{
    req.user.Tokens=[]
    await req.user.save();
    res.send(req.user)
})



*/

module.exports=task_r