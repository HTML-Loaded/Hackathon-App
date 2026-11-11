import express from "express";
import session from "express-session"
import homeRouter from "./routes/homeRoutes.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import path from "node:path"
import { randomBytes } from "node:crypto"
import { resetData } from "./data/resetData.js"

await resetData()

const app = express()
const port = 3000
const secret = randomBytes(32).toString("hex")

app.set('view engine', 'ejs')
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use('/home', homeRouter)

app.use('/', authRouter)

app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/home`);
});

