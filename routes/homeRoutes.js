import express from "express"
import Router from "express"
import fs from "node:fs/promises"
import path from "node:path"
import sponsors from "../data/sponsors.js"

const router = Router()
router.set('view engine', 'ejs')
const filePath = path.join(process.cwd(), "data", "sponsors.js")

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
    .post(async (req, res, next) => {
        try {
            const { name, email, company, message } = req.body;

            // Validate form inputs
            if (
                typeof name !== "string" || !name.trim() ||
                typeof email !== "string" || !email.trim() ||
                typeof company !== "string" || !company.trim() ||
                typeof message !== "string" || !message.trim()
            ) {
                return res.status(400).send("All fields are required");
            }

            // Create application object
            const application = {
                id: sponsors.length > 0
                    ? Math.max(...sponsors.map(app => app.id)) + 1
                    : 1,
                name: name.trim(),
                email: email.trim(),
                organization: company.trim(),
                body: message.trim(),
                status: false
            };

            // Add application to array
            const updatedSponsors = [...sponsors, application];

            // Save updated array to application.js
            const fileContent = `const sponsors = ${JSON.stringify(updatedSponsors, null, 4)};\n\nexport default sponsors;\n`;

            await fs.writeFile(filePath, fileContent);

            sponsors.push(application);

            res.status(201).send("Sponsorship application submitted successfully!");
        }
        catch (error) {
            next(error);
        }
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