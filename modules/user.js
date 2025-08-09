const {createHmac, randomBytes} = require('crypto');
const mongoose= require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,   
    },
    salt:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        unique:true,
    },
    profile_photo:{
        type:String,
        default:"/public/images/default.png"
    },
    role:{
        type:String,
        enum: ['USER','ADMIN'],
        default:'USER'
    },
},{ timestamps:true }
)

userSchema.pre("save",function (next){
    const user=this;
    
    if(!user.isModified("password")) return;

    const salt=randomBytes(16).toString();
    const hashedPasswor=createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");
    
    this.salt=salt;
    this.password=hashedPasswor;

    next(); 
})

const User=mongoose.model('user',userSchema)
module.exports=User;
