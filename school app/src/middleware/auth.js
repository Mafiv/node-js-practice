const jwt=require('jsonwebtoken')
const {student}=require('../models/student')
const authenicate= async (req,res,next)=>{
    
    try{
    const tok=req.header('auto').replace('Bearer','')
    const verify=await jwt.verify(tok,"hellow world")
    const us=await student.findOne({_id:verify.id,'Tokens.token':tok})    
    if(!us){
        return res.send("incorrect token")
    }
    else{
        req.user=us
        req.token=tok
        // res.send(us)
    }
    }
    catch(e){
        console.log(e)
        // throw new Error("there")
    }

    next()

}
module.exports=authenicate