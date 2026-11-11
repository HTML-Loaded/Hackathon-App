import { createApplication } from "../services/sponsorService.js"
// Render home.ejs
export const getHome = (req, res) => {
    res.render("home")
}
// 'Submit' a sponsor application
export const submitSponsor = async (req, res, next) => {
    try {
        const { name, email, company, message } = req.body

        if (!name || !email || !company || !message) {
            return res.status(400).send("All fields are required")
        }

        await createApplication(name, email, company, message)

        res.status(201).send("Application submitted successfully")
    }
    catch (error) {
        next(error)
    }
}