const express=require('express');
require('../models/database_connection');
const  {student}=require('../models/student');
const { default: mongoose } = require('mongoose');
const bcript=require('bcrypt')
const auth=require('../middleware/auth')

const router=new express.Router()

router.post('/add',async(req,res)=>{
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





module.exports=router;