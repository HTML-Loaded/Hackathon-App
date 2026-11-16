import { getProjectByTeamId, saveProject} from "../services/projectService.js"

export const getProjectPage = async (req, res, next) => {
    try {
        const user = res.locals.currentUser

        if (!user || !user.teamId) {
            return res.redirect("/teams")
        }

        const project = await getProjectByTeamId(user.teamId)

        res.render("projects", { project })
    }
    catch (error) {
        next(error)
    }
}

export const submitProject = async (req, res, next) => {
    try {
        const user = res.locals.currentUser

        if (!user || !user.teamId) {
            return res.status(403).send("You must belong to a team")
        }

        const { title, description, repositoryLink } = req.body

        if (!title?.trim() || !description?.trim() || !repositoryLink?.trim()) {
            return res.status(400).send("All fields are required")
        }

        if (title.length > 100 || description.length > 2000) {
            return res.status(400).send("Project information is too long")
        }

        let url

        try {
            url = new URL(repositoryLink.trim())
        }
        catch {
            return res.status(400).send("Invalid repository URL")
        }

        if (!["http:", "https:"].includes(url.protocol)) {
            return res.status(400).send("Invalid repository URL")
        }

        await saveProject(user.teamId, {
            title: title.trim(),
            description: description.trim(),
            repositoryLink: url.href
        })

        res.redirect("/projects")
    }
    catch (error) {
        next(error)
    }
}
