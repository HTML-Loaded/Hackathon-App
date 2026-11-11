import { findUserByEmail, createUser, verifyPassword } from "../services/userService.js"

export const getLogin = (req, res) => {
    res.render("login")
}

export const getSignup = (req, res) => {
    res.render("signup")
}

export const signup = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body

        if (
            typeof name !== "string" || !name.trim() ||
            typeof email !== "string" || !email.trim() ||
            typeof password !== "string" || !password
        ) {
            return res.status(400).send("Invalid signup information")
        }

        if (password.length < 12) {
            return res.status(400).send("Password must be at least 12 characters")
        }

        if (password !== confirmPassword) {
            return res.status(400).send("Passwords do not match")
        }

        const existingUser = await findUserByEmail(email.trim())

        if (existingUser) {
            return res.status(409).send("Email already registered")
        }

        const user = await createUser(name, email.trim(), password, [])

        req.session.regenerate((err) => {
            if (err) return next(err)

            req.session.userId = user.id

            req.session.save((err) => {
                if (err) return next(err)
                res.redirect("/user")
            })
        })
    }
    catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).send("Invalid login information")
        }

        const user = await findUserByEmail(email.trim())

        if (!user || !(await verifyPassword(password, user.password))) {
            return res.status(401).send("Invalid email or password")
        }

        req.session.regenerate((err) => {
            if (err) return next(err)

            req.session.userId = user.id

            req.session.save((err) => {
                if (err) return next(err)
                res.redirect("/user")
            })
        })
    }
    catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err)

        res.clearCookie("connect.sid", { path: "/" })
        res.redirect("/login")
    })
}