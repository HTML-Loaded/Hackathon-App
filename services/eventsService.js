import fs from "node:fs/promises"
import path from "node:path"

const eventsPath = path.join(import.meta.dirname, "../data/events.json")

export const getEvents = async () => {
    const data = await fs.readFile(eventsPath, "utf8")
    return JSON.parse(data)
}


export const canScheduleEvent = (newEvent, events) => {
    const newStart = new Date(
        `${newEvent.startDate}T${newEvent.timestart}`
    ).getTime()

    const newEnd = new Date(
        `${newEvent.endDate}T${newEvent.timeend}`
    ).getTime()

    if (!Number.isFinite(newStart) ||
        !Number.isFinite(newEnd) ||
        newEnd - newStart !== 60 * 60 * 1000) {
        return false
    }

    // Day 2 is reserved for the hackathon
    const day2Start = new Date("2026-11-20T00:00").getTime()
    const day2End = new Date("2026-11-21T00:00").getTime()

    if (newStart < day2End && newEnd > day2Start) {
        return false
    }

    const gap = 30 * 60 * 1000

    // Reject events that violate the 30-minute gap
    // or overlap another event in the same room
    for (const event of events) {
        const start = new Date(
            `${event.startDate}T${event.timestart}`
        ).getTime()

        const end = new Date(
            `${event.endDate}T${event.timeend}`
        ).getTime()

        const sameRoom = event.locations.trim().toLowerCase() ===
            newEvent.locations.trim().toLowerCase()

        if (sameRoom &&
            newStart < end + gap &&
            newEnd + gap > start) {
            return false
        }
    }

    // Maximum two events running simultaneously
    const points = [
        { time: newStart, change: 1 },
        { time: newEnd, change: -1 }
    ]

    for (const event of events) {
        const start = new Date(
            `${event.startDate}T${event.timestart}`
        ).getTime()

        const end = new Date(
            `${event.endDate}T${event.timeend}`
        ).getTime()

        if (newStart < end && newEnd > start) {
            points.push({
                time: Math.max(start, newStart),
                change: 1
            })

            points.push({
                time: Math.min(end, newEnd),
                change: -1
            })
        }
    }

    points.sort((a, b) =>
        a.time - b.time || a.change - b.change
    )

    let active = 0

    for (const point of points) {
        active += point.change

        if (active > 2) {
            return false
        }
    }

    return true
}

export const createEvent = async (eventData) => {
    const events = await getEvents()

    if (!canScheduleEvent(eventData, events)) {
        return null
    }

    const newEvent = {
        id: events.length > 0
            ? Math.max(...events.map(event => event.id)) + 1
            : 1,
        ...eventData,
        participantNum: 0,
        participants: []
    }

    events.push(newEvent)

    await fs.writeFile(
        eventsPath,
        JSON.stringify(events, null, 4)
    )

    return newEvent
}


export const registerUser = async (eventId, userId) => {
    const events = await getEvents()

    const event = events.find(event => event.id === eventId)

    if (!event) {
        return false
    }

    // Ensure participants exists
    event.participants ??= []

    // Prevent duplicate registrations
    if (event.participants.includes(userId)) {
        return false
    }

    // Add the logged-in user
    event.participants.push(userId)

    // Update participant count
    event.participantNum = event.participants.length

    await fs.writeFile(eventsPath, JSON.stringify(events, null, 4))

    return true
}

