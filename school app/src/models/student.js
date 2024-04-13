const mongoose=require('mongoose');
const validator=require('validator')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const student_sch= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true

    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value<0){
                throw new Error("age must be posetive")
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("the value is not an email")
            }
        }
    },
    grade:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    Tokens:[{
        token:{
            required:true,
            type:String
        }
        
}]})

student_sch.virtual('tasker',{
    ref:'task',
    localField:'_id',
    foreignField:'owner'
})


student_sch.methods.toJSON=function(){
    const user=this
    const usobj=user.toObject();
    delete usobj.password;
    delete usobj.Tokens;
    delete usobj._V;
    return usobj
}


student_sch.methods.generateAuthToken =async function(){
    const user=this;
    const token=jwt.sign({id:user._id.toString()},"hellow world");
    console.log()
    user.Tokens=user.Tokens.concat({token})
    await user.save()
    return token

}

student_sch.statics.getbycredential=async (email,password)=>{
    try{
    const sample_student=await student.findOne({email});
    if(!sample_student){
        return "no account found"
    }
    const isPasswordMatch = await bcrypt.compare(password,sample_student.password);
    if (!isPasswordMatch) {
            return "password incorrect";
    }
    return sample_student;
    }catch(e){
    console.log("error")
    }}


student_sch.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    console.log("just before saving")

    next()
})




const student=mongoose.model("students",student_sch)
module.exports={student}
