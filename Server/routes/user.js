const { Router } = require("express");
const router = Router();
const User = require("../modules/user")

// router.get("/login", (req, res) => {
//     return res.render("signin")
// })
// router.get("/signup", (req, res) => {
//     return res.render("signup")
// })

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        await User.create({
            fullName,
            email,
            password,
        })
        return res.json({ message: "Signup successful" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndgenerateToken(email, password);
        return res.cookie("token", token).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").json({ message: "Logout succesfully" });
})

module.exports = router;