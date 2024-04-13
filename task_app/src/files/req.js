const express=require('express');
const port=process.env.PORT||3000;
const {student}=require('../models/user');
const {subject}=require('../models/user');
const app=express();
app.use(express.json());


/*
app.get('/hello',(req,res)=>{
    student.find({name:"miraf amare"}).then((ress)=>{res.send(ress)}).catch(
        (e)=>{res.send(e)}
    )
})

app.get('/he',(req,res)=>{
    student.findById("65a027e30a6f670a1a4deae8").then((ress)=>{res.send(ress)}).catch(
        (e)=>{res.send(e)}
    )
})*/
app.post('/add',(req,res)=>{
    const sub=new subject(req.body)
    sub.save().then((resp)=>res.send("entity saved")).catch((e)=>{res.send(e)})
});

app.get('/find/:name',(req,res)=>{
    const sr_name=req.params.name;
    subject.findOne({name:sr_name}).then((item)=>{
        if(item){
            res.send("this is the item\n"+item)}
        
        else{
            res.send("not found")}

        }).catch((e)=>res.send(e))
})




app.listen(port,()=>{
    console.log("server is up and runnging");
});
