const express=require("express");
const app= express();
const path=require("path");
const userRoute=require('./routes/user')
const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/blogify")
    .then((e)=> console.log("mongodb is connected"))
app.use(express.urlencoded({ extended: false}));

// middlewares
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",(req,res)=>{
    res.render('home');
});


app.use("/user",userRoute);

app.listen(8000,()=> console.log("App is running on port 8000"))
