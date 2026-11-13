
const events = JSON.parse(
    document.querySelector("#events-data").textContent
)

const currentUserId = JSON.parse(
    document.querySelector("#current-user-data").textContent
)

const dayButtons = document.querySelectorAll(".day-btn")
const daySlider = document.querySelector(".day-slider")
const eventsGrid = document.querySelector("#events-grid")
const dayTitle = document.querySelector("#selected-day-title")

const days = [
    "2026-11-19",
    "2026-11-20",
    "2026-11-21"
]

// Escape user-created text before inserting it into HTML
const escapeHTML = (value) => {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char])
}

const formatDate = (date) => {
    const [year, month, day] = date.split("-").map(Number)

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    })
}

const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hour = hours % 12 || 12

    return `${hour}:${String(minutes).padStart(2, "0")} ${period}`
}

const renderEvents = (selectedDay) => {
    // Show events that overlap the selected day
    const filteredEvents = events.filter(event =>
        event.startDate <= selectedDay &&
        event.endDate >= selectedDay
    )

    filteredEvents.sort((a, b) => {
        const aTime = a.startDate === selectedDay ? a.timestart : "00:00"
        const bTime = b.startDate === selectedDay ? b.timestart : "00:00"

        return aTime.localeCompare(bTime)
    })

    if (filteredEvents.length === 0) {
        eventsGrid.innerHTML = `
            <p class="no-events">No events scheduled for this day.</p>
        `
        return
    }

    eventsGrid.innerHTML = filteredEvents.map(event => {
        const isRegistered = event.participants?.includes(currentUserId)
        const images = Array.isArray(event.imgs)
            ? event.imgs.filter(img => typeof img === "string" && img.startsWith("/images/"))
            : []

        const slides = images.length > 0
            ? images.map(img => `
                <img
                    src="${escapeHTML(img)}"
                    alt="${escapeHTML(event.name)}"
                    class="event-slide"
                >
            `).join("")
            : `<div class="event-image-placeholder">No image available</div>`

        const dateText = event.startDate === event.endDate
            ? formatDate(event.startDate)
            : `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`

        return `
            <article class="event-card">

                <div class="event-carousel">
                    <div class="event-slides">
                        ${slides}
                    </div>

                    ${images.length > 1 ? `
                        <button class="carousel-btn prev" type="button"
                            aria-label="Previous image">❮</button>
                        <button class="carousel-btn next" type="button"
                            aria-label="Next image">❯</button>
                    ` : ""}
                </div>

                <div class="event-content">
                    <h3>${escapeHTML(event.name)}</h3>

                    <p class="event-description">
                        ${escapeHTML(event.description)}
                    </p>

                    <div class="event-details">
                        <p><strong>Location:</strong> ${escapeHTML(event.locations)}</p>
                        <p><strong>Date:</strong> ${escapeHTML(dateText)}</p>
                        <p>
                            <strong>Time:</strong>
                            ${formatTime(event.timestart)} –
                            ${formatTime(event.timeend)}
                            ${event.startDate !== event.endDate ? "(next day)" : ""}
                        </p>
                        <p>
                            <strong>Participants:</strong>
                            ${Number(event.participantNum) || 0}
                        </p>
                    </div>
                    <div class="event-actions">
                        ${currentUserId === null ? `
                            <a href="/login" class="event-register-btn">
                                Log In to Register
                            </a>
                        ` : isRegistered ? `
                            <button class="event-register-btn" disabled>
                                Registered
                            </button>
                        ` : `
                            <form action="/events/${event.id}/register" method="POST">
                                <input type="hidden" name="day" value="${selectedDay}">

                                <button type="submit" class="event-register-btn">
                                    Register
                                </button>
                            </form>
                        `}
                    </div>
                </div>
            </article>
        `
    }).join("")

    initializeCarousels()
}

const initializeCarousels = () => {
    document.querySelectorAll(".event-carousel").forEach(carousel => {
        const slides = carousel.querySelector(".event-slides")
        const images = carousel.querySelectorAll(".event-slide")
        const prev = carousel.querySelector(".prev")
        const next = carousel.querySelector(".next")

        if (images.length <= 1) return

        let currentIndex = 0

        const updateCarousel = () => {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`
        }

        prev.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length
            updateCarousel()
        })

        next.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length
            updateCarousel()
        })
    })
}

dayButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        dayButtons.forEach(btn => btn.classList.remove("active"))
        button.classList.add("active")

        daySlider.style.transform = `translateX(${index * 100}%)`

        const selectedDay = button.dataset.day

        dayTitle.textContent = `${formatDate(selectedDay)} Events`

        renderEvents(selectedDay)
    })
})

const requestedDay = new URLSearchParams(window.location.search).get("day")

const initialDay = days.includes(requestedDay)
    ? requestedDay
    : days[0]

dayButtons.forEach((button, index) => {
    if (button.dataset.day === initialDay) {
        button.classList.add("active")
        daySlider.style.transform = `translateX(${index * 100}%)`
    }
    else {
        button.classList.remove("active")
    }
})

dayTitle.textContent = `${formatDate(initialDay)} Events`

renderEvents(initialDay)