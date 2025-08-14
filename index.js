const express=require("express");
const app= express();
const path=require("path");

console.log("hii my name is ",process.env.myname);

const userRoute=require('./routes/user')
const addblogRouter=require('./routes/blog')

const mongoose=require("mongoose")
const cookiePaser=require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middleware/authenticationMid");
const Blog = require("./modules/blog");

mongoose.connect("mongodb://localhost:27017/blogify")
    .then((e)=> console.log("mongodb is connected"))

// middlewares
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended: false}));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))
// app.use(express.static(path.resolve('./public/images')))

app.get("/",async (req,res)=>{
    const allBlogs= await Blog.find({});
    res.render('home',{
        user:req.user,
        blogs:allBlogs,
    });
});

app.use("/user",userRoute);
app.use("/blog",addblogRouter);



app.listen(8000,()=> console.log("App is running on port 8000"))
