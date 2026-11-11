import express from "express"
import Router from "express"
import path from "node:path"

const router = Router()
router.set('view engine', 'ejs')

// custom middleware example
router.use((req, res, next) => {
    console.log(`Request URL: ${req.originalURL}, Time: ${new Date().toISOString()}`);
    next();
})

// serve the homepage
router.route("/")
    .get((req, res) => {
        res.render("home")
    })
    .post((req, res) => {
        res.status(200())
    })

// error handling. serve 404 and etc

// return next(error) in a route to go to error roueter

router.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
    error: err.message || "Internal Server Error"
    });
});

export default router