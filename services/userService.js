import fs from "node:fs/promises"
import path from "node:path"
import bcrypt from "bcrypt"

const filePath = path.join(process.cwd(), "data", "users.json")
const saltRounds = 12

export const getUsers = async () => {
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
}

export const findUserByEmail = async (email) => {
    const users = await getUsers()

    return users.find(user => user.email === email.toLowerCase())
}

export const findUserById = async (id) => {
    const users = await getUsers()

    return users.find(user => user.id === id)
}

export const createUser = async (name, email, password, skills) => {
    const users = await getUsers()

    const newUser = {
    id: users.length > 0
        ? Math.max(...users.map(user => user.id)) + 1
        : 1,
    teamId: null,
    roles: "participant",
    name: name.trim(),
    email: email.toLowerCase().trim(),
    skills: "",
    description: "",
    password: await bcrypt.hash(password, saltRounds),
    imageUrl: "/images/default-profile.png"
}

    users.push(newUser)

    await fs.writeFile(filePath, JSON.stringify(users, null, 4))

    return newUser
}

export const verifyPassword = async (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const updateUser = async (id, updates) => {
    const users = await getUsers()

    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        return null
    }

    users[userIndex] = {
        ...users[userIndex],
        ...updates
    }

    await fs.writeFile(filePath, JSON.stringify(users, null, 4))

    return users[userIndex]
}