const {Router}=require("express");
const multer=require("multer")
const Blog = require("../modules/blog");
const router= Router();

router.get("/add-new",(req,res)=>{
    return res.render("addblog",{
        user: req.user,
    })
})

router.post("/add-new",async (req,res)=>{
    const { title, body, coverImageURL }=req.body;
    await Blog.create({
        title,
        body,
        coverImageURL,
    })
    return res.redirect("/");
})

module.exports=router;