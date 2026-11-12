import fs from "node:fs/promises"
import path from "node:path"

const teamsPath = path.join(import.meta.dirname, "../data/teams.json")
const usersPath = path.join(import.meta.dirname, "../data/users.json")

export const getTeams = async () => {
    const data = await fs.readFile(teamsPath, "utf8")
    return JSON.parse(data)
}

export const findTeamById = async (id) => {
    const teams = await getTeams()
    return teams.find(team => team.id === id)
}

export const getTeamMembers = async (team) => {
    const data = await fs.readFile(usersPath, "utf8")
    const users = JSON.parse(data)

    return team.memberList
        .map(id => users.find(user => user.id === id))
        .filter(Boolean)
}

export const applyToTeam = async (teamId, userId) => {
    const teams = await getTeams()
    const team = teams.find(team => team.id === teamId)

    if (!team) return false

    // Prevent duplicate applications or existing members applying
    if (team.memberList.includes(userId) ||
        team.applicationList.includes(userId)) {
        return false
    }

    team.applicationList.push(userId)

    await fs.writeFile(teamsPath, JSON.stringify(teams, null, 4))

    return true
}

export const approveApplicant = async (teamId, userId) => {
    const teams = await getTeams()
    const team = teams.find(team => team.id === teamId)

    if (!team) return false

    // Only approve users who actually applied
    if (!team.applicationList.includes(userId)) {
        return false
    }

    // Add the applicant to the accepted team's members
    if (!team.memberList.includes(userId)) {
        team.memberList.push(userId)
    }

    // Remove the user's applications from every team
    teams.forEach(currentTeam => {
        currentTeam.applicationList = (currentTeam.applicationList || [])
            .filter(id => id !== userId)
    })

    await fs.writeFile(teamsPath, JSON.stringify(teams, null, 4))

    return true
}

export const getTeamApplicants = async (team) => {
    const data = await fs.readFile(usersPath, "utf8")
    const users = JSON.parse(data)

    return (team.applicationList || [])
        .map(id => users.find(user => user.id === id))
        .filter(Boolean)
}

export const updateTeam = async (teamId, updates) => {
    const teams = await getTeams()

    const teamIndex = teams.findIndex(team => team.id === teamId)

    if (teamIndex === -1) {
        return null
    }

    teams[teamIndex] = {
        ...teams[teamIndex],
        ...updates
    }

    await fs.writeFile(teamsPath, JSON.stringify(teams, null, 4))

    return teams[teamIndex]
}