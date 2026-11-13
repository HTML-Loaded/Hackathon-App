import { getEvents, registerUser, createEvent} from "../services/eventsService.js"

export const getEventsPage = async (req, res, next) => {
    try {
        const events = await getEvents()

        res.render("events", { events })
    }
    catch (error) {
        next(error)
    }
}

export const getCreateEventPage = (req, res) => {
    res.render("createEvent")
}

export const registerForEvent = async (req, res, next) => {
    try {
        const eventId = Number(req.params.id)
        const userId = req.session.userId

        if (!Number.isSafeInteger(eventId) || eventId < 1) {
            return res.sendStatus(404)
        }

        const registered = await registerUser(eventId, userId)

        const allowedDays = [
            "2026-11-19",
            "2026-11-20",
            "2026-11-21"
        ]

        const selectedDay = allowedDays.includes(req.body.day) ? req.body.day : allowedDays[0]

        if (!registered) {
            return res.redirect(`/events?day=${selectedDay}`)
        }

        res.redirect(`/events?day=${selectedDay}`)
    }
    catch (error) {
        next(error)
    }
}


export const submitEvent = async (req, res, next) => {
    try {
        const {
            name,
            description,
            locations,
            startDate,
            timestart,
            img1,
            img2,
            img3
        } = req.body

        const allowedDates = ["2026-11-19", "2026-11-21"]

        if (!allowedDates.includes(startDate)) {
            return res.status(400).send("Invalid event date")
        }

        const start = new Date(`${startDate}T${timestart}`)

        if (Number.isNaN(start.getTime())) {
            return res.status(400).send("Invalid start time")
        }

        const end = new Date(start.getTime() + 60 * 60 * 1000)

        const timeend = [
            String(end.getHours()).padStart(2, "0"),
            String(end.getMinutes()).padStart(2, "0")
        ].join(":")

        if (!name?.trim() ||
            !description?.trim() ||
            !locations?.trim() ||
            name.length > 100 ||
            description.length > 2000) {
            return res.status(400).send("Invalid event information")
        }

        // Prevent events from extending into another day
        if (end.getDate() !== start.getDate()) {
            return res.status(400).send(
                "Events must start and end on the same day"
            )
        }

        const eventData = {
            name: name.trim(),
            description: description.trim(),
            locations: locations.trim(),
            startDate,
            endDate: startDate,
            timestart,
            timeend,
            imgs: [img1, img2, img3]
                .filter(img => typeof img === "string" &&
                    img.startsWith("/images/"))
        }

        const event = await createEvent(eventData)

        if (!event) {
            return res.status(409).send(
                "This time or room is unavailable"
            )
        }

        res.redirect(`/events?day=${event.startDate}`)
    }
    catch (error) {
        next(error)
    }
}
