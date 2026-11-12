import express from "express";
import session from "express-session"
import fs from "node:fs/promises"
import homeRouter from "./routes/homeRoutes.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
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

const teamsObj = JSON.parse(await fs.readFile("./data/teams.json", "utf8"))

app.get('/teams', (req, res) => {
    res.render('teams', { teams: teamsObj })
})

const usersObj = JSON.parse(await fs.readFile("./data/users.json", "utf8"))

app.get('/team/3', (req, res) => {
    const team = teamsObj.find(team => team.id === 3)

    const members = team.memberList
                .map(id => usersObj.find(user => user.id === id))
                .filter(Boolean)

    const isMember = req.query.private === "true"

    res.render("team", {
                team,
                members,
                isMember
            })
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/home`);
});

