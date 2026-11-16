import fs from "node:fs/promises"
import path from "node:path"

const projectsPath = path.join(import.meta.dirname, "../data/projects.json")

export const getProjects = async () => {
    const data = await fs.readFile(projectsPath, "utf8")
    return JSON.parse(data)
}

export const getProjectByTeamId = async (teamId) => {
    const projects = await getProjects()

    return projects.find(project => project.teamId === teamId) || null
}

export const saveProject = async (teamId, projectData) => {
    const projects = await getProjects()

    let project = projects.find(project => project.teamId === teamId)

    if (project) {
        // Update an existing project
        project.title = projectData.title
        project.description = projectData.description
        project.repositoryLink = projectData.repositoryLink
        project.submissionDate = new Date().toISOString()
    }
    else {
        // Create a new project
        project = {
            id: projects.length > 0
                ? Math.max(...projects.map(project => project.id)) + 1
                : 1,
            teamId,
            title: projectData.title,
            description: projectData.description,
            repositoryLink: projectData.repositoryLink,
            submissionDate: new Date().toISOString()
        }

        projects.push(project)
    }

    await fs.writeFile(
        projectsPath,
        JSON.stringify(projects, null, 4)
    )

    return project
}
