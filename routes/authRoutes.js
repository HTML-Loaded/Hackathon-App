import Router from "express"

const router = Router()

router.route("/login")
    .get((req, res) => {
        res.render("login")
    })
    .post((req, res) => {
        console.log(req.body)
        res.send("Login submitted")
    })

router.route("/signup")
    .get((req, res) => {
        res.render("signup")
    })
    .post((req, res) => {
        console.log(req.body)
        res.send("Signup submitted")
    })

export default router