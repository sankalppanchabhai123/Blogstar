const {Router}=require("express");
const multer=require("multer")
const path=require("path")
const Blog = require("../modules/blog");
const router= Router();

const storage=multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req,file,cb){
        const fileName=`${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
})

const upload=multer({storage: storage})

router.get("/add-new",(req,res)=>{
    return res.render("addblog",{
        user: req.user,
    })
})

router.post("/add-new",upload.single("coverImage"), (req,res)=>{
    // const { title, body, coverImageURL }=req.body;
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
})

module.exports=router;