import fs from "node:fs/promises"
import path from "node:path"
import { seedData } from "./seedData.js"

export const resetData = async () => {
    const data = await seedData()

    for (const [fileName, objects] of Object.entries(data)) {
        const filePath = path.join(import.meta.dirname, fileName)

        await fs.writeFile(filePath, JSON.stringify(objects, null, 4))
    }

    console.log("JSON files reset successfully")
}