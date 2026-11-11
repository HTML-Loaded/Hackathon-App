import fs from "node:fs/promises"
import path from "node:path"

const filePath = path.join(process.cwd(), "data", "sponsors.json")

export const createApplication = async (name, email, company, message) => {
    const data = await fs.readFile(filePath, "utf8")
    const sponsors = JSON.parse(data)

    const application = {
        id: sponsors.length > 0
            ? Math.max(...sponsors.map(app => app.id)) + 1
            : 1,
        name: name,
        email: email,
        organization: company,
        body: message,
        status: false
    }

    sponsors.push(application)

    await fs.writeFile(filePath, JSON.stringify(sponsors, null, 4))

    return application
}