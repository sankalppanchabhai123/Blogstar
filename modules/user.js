const { error } = require('console');
const {createHmac, randomBytes} = require('crypto');
const mongoose= require("mongoose");
const { createTokenForUser, validateToken } = require('../services/authentication');

const userSchema=new mongoose.Schema({
    fullName:{
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

    const salt=randomBytes(16).toString("hex");
    const hashedPasswor=createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");
    
    this.salt=salt;
    this.password=hashedPasswor;

    next(); 
})

// virtual function mongoose
userSchema.static("matchPasswordAndgenerateToken",async function(email, password){
    const user=await this.findOne({email});
    if(!user) throw new Error("User not found");

    const salt =user.salt;
    const hashedPassword=user.password;

    const userProvidedHash =createHmac("sha256",salt)
        .update(password)
        .digest("hex");

    if(hashedPassword!=userProvidedHash) throw new Error("incorrect password");

    const token=createTokenForUser(user);
    return token;
})

const User=mongoose.model('user',userSchema)
module.exports=User;
