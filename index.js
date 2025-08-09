const express=require("express");
const app= express();
const path=require("path");
const urouter=require('./routes/user')
const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost")


// middlewares
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",(req,res)=>{
    res.render('home');
});


app.use("/user",urouter);

app.listen(8000,()=> console.log("App is running on port 8000"))
