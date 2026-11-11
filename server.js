import express from "express";
import homeRouter from "./routes/homeRoutes.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import path from "node:path"

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/home', homeRouter)

app.use('/authentication', authRouter)

app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/home`);
});