import express from "express";
import session from "express-session"
import fs from "node:fs/promises"
import homeRouter from "./routes/homeRoutes.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import teamsRouter from "./routes/teamsRoutes.js"
import path from "node:path"
import { randomBytes } from "node:crypto"
import { resetData } from "./data/resetData.js"
import { loadCurrentUser } from "./middleware/authMiddleware.js"

await resetData()

const app = express()
const port = 3000
// session secret
const secret = randomBytes(32).toString("hex")

app.set('view engine', 'ejs')
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Create session
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

// Allow ejs pages to access currentUser during valid session
app.use(loadCurrentUser)

// homepage
app.use('/home', homeRouter)

// login and signup
app.use('/', authRouter)

// user and edit user pages
app.use('/user', userRouter)

app.use('/teams', teamsRouter)

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/home`);
});

