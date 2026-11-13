import { getTeams, findTeamById, getTeamMembers, getTeamApplicants, applyToTeam, approveApplicant, updateTeam, createTeam} from "../services/teamsService.js"
import { findUserById, updateUser } from "../services/userService.js"

// Display all teams
export const getTeamsPage = async (req, res, next) => {
    try {
        const teams = await getTeams()

        const teamsWithMembers = await Promise.all(
            teams.map(async team => ({
                ...team,
                members: await getTeamMembers(team)
            }))
        )

        res.render("teams", { teams: teamsWithMembers })
    }
    catch (error) {
        next(error)
    }
}

// Display a specific team
export const getTeamPage = async (req, res, next) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isSafeInteger(id) || id < 1) {
            return res.sendStatus(404)
        }

        const team = await findTeamById(id)

        if (!team) {
            return res.sendStatus(404)
        }

        const members = await getTeamMembers(team)

        const isMember = team.memberList.includes(req.session?.userId)

        const hasApplied = (team.applicationList || [])
            .includes(req.session?.userId)

        const applicants = isMember
            ? await getTeamApplicants(team)
            : []

        res.render("team", {
            team,
            members,
            applicants,
            isMember,
            hasApplied
        })
    }
    catch (error) {
        next(error)
    }
}

export const submitApplication = async (req, res, next) => {
    try {
        const teamId = Number(req.params.id)
        const userId = req.session.userId

        if (!Number.isSafeInteger(teamId) || teamId < 1) {
            return res.sendStatus(404)
        }

        // Only users without a team can apply
        if (req.user.teamId !== 0) {
            return res.status(403).send("You already belong to a team")
        }

        await applyToTeam(teamId, userId)

        res.redirect(`/teams/${teamId}`)
    }
    catch (error) {
        next(error)
    }
}

export const approveApplication = async (req, res, next) => {
    try {
        const teamId = Number(req.params.id)
        const applicantId = Number(req.params.userId)

        if (!Number.isSafeInteger(teamId) || teamId < 1 ||
            !Number.isSafeInteger(applicantId) || applicantId < 1) {
            return res.sendStatus(404)
        }

        const team = await findTeamById(teamId)

        if (!team) {
            return res.sendStatus(404)
        }

        // Only team members can approve applications
        if (!team.memberList.includes(req.session.userId)) {
            return res.sendStatus(403)
        }

        const applicant = await findUserById(applicantId)

        if (!applicant || applicant.teamId !== 0) {
            return res.status(409).send("Applicant is already in a team or does not exist")
        }

        const approved = await approveApplicant(teamId, applicantId)

        if (!approved) {
            return res.sendStatus(404)
        }

        // Keep the user's teamId synchronized
        await updateUser(applicantId, { teamId })

        res.redirect(`/teams/${teamId}`)
    }
    catch (error) {
        next(error)
    }
}

export const getEditTeamPage = async (req, res, next) => {
    try {
        const teamId = Number(req.params.id)

        if (!Number.isSafeInteger(teamId) || teamId < 1) {
            return res.sendStatus(404)
        }

        const team = await findTeamById(teamId)

        if (!team) {
            return res.sendStatus(404)
        }

        if (!team.memberList.includes(req.session.userId)) {
            return res.sendStatus(403)
        }

        res.render("editTeam", { team })
    }
    catch (error) {
        next(error)
    }
}

export const saveTeamChanges = async (req, res, next) => {
    try {
        const teamId = Number(req.params.id)

        if (!Number.isSafeInteger(teamId) || teamId < 1) {
            return res.sendStatus(404)
        }

        const team = await findTeamById(teamId)

        if (!team) {
            return res.sendStatus(404)
        }

        // Only members of this team can edit it
        if (!team.memberList.includes(req.session.userId)) {
            return res.sendStatus(403)
        }

        const teamName = req.body.teamName?.trim()
        const description = req.body.description?.trim()

        if (!teamName || !description ||
            teamName.length > 100 || description.length > 2000) {
            return res.status(400).send("Invalid team information")
        }

        await updateTeam(teamId, {
            teamName,
            description
        })

        res.redirect(`/teams/${teamId}`)
    }
    catch (error) {
        next(error)
    }
}

export const getCreateTeamPage = (req, res) => {
    if (res.locals.currentUser.teamId !== 0) {
        return res.redirect(`/teams/${res.locals.currentUser.teamId}`)
    }

    res.render("createTeam")
}

export const submitTeam = async (req, res, next) => {
    try {
        const userId = req.session.userId
        const { teamName, description } = req.body

        const user = res.locals.currentUser

        // Prevent users from creating multiple teams
        if (user.teamId !== 0) {
            return res.redirect(`/teams/${user.teamId}`)
        }

        if (!teamName?.trim() || !description?.trim()) {
            return res.status(400).send("All fields are required")
        }

        const team = await createTeam(
            teamName.trim(),
            description.trim(),
            userId
        )

        if (!team) {
            return res.status(409).send("Team name already exists")
        }

        // Associate the creator with their new team
        await updateUser(userId, { teamId: team.id })

        res.redirect(`/teams/${team.id}`)
    }
    catch (error) {
        next(error)
    }
}