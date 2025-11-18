const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

require("dotenv").config();


const userRoute = require('./routes/user')
const addblogRouter = require('./routes/blog')

const mongoose = require("mongoose")
const cookiePaser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middleware/authenticationMid");
const Blog = require("./modules/blog");
const { url } = require("inspector");
const { appendFile } = require("fs");
const User = require("./modules/user");

mongoose.connect(process.env.MONGO_URL)
    .then((e) => console.log("mongodb is connected"))

// middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))
app.use(express.static(path.resolve('./public/images')))

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});
app.get("/blogs", async (req, res) => {
    const allBlogs = await Blog.find({});
    return res.send({
        user: req.user,
        blogs: allBlogs,
    });
});

// Routes
app.use("/user", userRoute);
app.use("/blog", addblogRouter);



app.listen(8000, () => console.log("App is running on port 8000"))
