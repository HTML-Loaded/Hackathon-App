import bcrypt from "bcrypt"

export const seedData = async () => {
    return {
        "users.json": [
            {
                id: 1,
                teamId: 1,
                profilePicture: "/images/default-profile.png",
                name: "John Smith",
                email: "john@example.com",
                password: await bcrypt.hash("password1234", 10),
                roles: ["participant"],
                skills: ["JavaScript", "Python"],
                description: ""
            },
            {
                id: 2,
                teamId: 1,
                profilePicture: "/images/default-profile.png",
                name: "Jane Doe",
                email: "jane@example.com",
                password: await bcrypt.hash("password5678", 10),
                roles: ["participant"],
                skills: ["HTML", "CSS"],
                description: ""
            },
            {
                id: 3,
                teamId: 1,
                profilePicture: "https://media.tenor.com/QVXwXVq-1EYAAAAM/tole-tole-mei-mei.gif",
                name: "Leo",
                email: "leo@example.com",
                password: await bcrypt.hash("mynewpassword", 10),
                roles: ["participant"],
                skills: ["HTML", "CSS", "Javascript", "NodeJS + Express", "Procrastination"],
                description: "Full stack pro developer #1 on hackerrank fr"
            },
            {
                id: 67,
                teamId: 3,
                profilePicture: "https://media1.tenor.com/m/vdPXShwp4q4AAAAd/orospu-esek-e%C5%9F%C5%9F%C5%9Fekk.gif",
                name: "Jorge",
                email: "jorge@example.com",
                password: await bcrypt.hash("aaaaPassword", 10),
                roles: ["participant"],
                skills: ["Python", "C++", "Java", "Volleball setter", "boardgame enthusiast"],
                description: "Loveable guy that struggles tying his shoes"
            },
            {
                id: 10,
                teamId: 2,
                profilePicture: "",
                name: "Ivan",
                email: "ivan@example.com",
                password: await bcrypt.hash("bbbbPassword", 10),
                roles: ["participant"],
                skills: ["vibe coding"],
                description: ""
            },
            {
                id: 8,
                teamId: 2,
                profilePicture: "",
                name: "May",
                email: "may@example.com",
                password: await bcrypt.hash("ccccPassword", 10),
                roles: ["participant"],
                skills: ["Ruby", "Assembly"],
                description: ""
            },
            {
                id: 13,
                teamId: 0,
                profilePicture: "https://media.discordapp.net/attachments/746382654378737938/1570258797476450415/IMG_5392.png?ex=6af670f7&is=6af51f77&hm=5273aef692e4be42011dd53260016e5f01536b320d3a182c43a01db00b44b763&=&format=webp&quality=lossless",
                name: "Dave",
                email: "dave@example.com",
                password: await bcrypt.hash("ddddPassword", 10),
                roles: ["participant"],
                skills: ["C++, Javascript, React, Databases"],
                description: ""
            },
            {
                id: 24,
                teamId: 0,
                profilePicture: "",
                name: "Divia",
                email: "divia@example.com",
                password: await bcrypt.hash("eeeePassword", 10),
                roles: ["participant"],
                skills: ["Haskell, Typescript, Linux"],
                description: ""
            },
        ],

        "sponsors.json": [
            {
                id: 1,
                name: "Example Sponsor",
                email: "sponsor@example.com",
                organization: "RGV Technologies",
                body: "We would like to sponsor the hackathon.",
                status: false
            }
        ],

        "teams.json": [
            {
                id: 1,
                teamName: "Code Cowboys",
                description: "A team of developers building innovative applications for the Rio Grande Valley. We focus on full-stack development and creating practical solutions to everyday problems.",
                memberList: [1, 2, 3],
                applicationList: []
            },
            {
                id: 2,
                teamName: "Valley Innovators",
                description: "We combine different programming skills to develop creative solutions for local businesses. Our goal is to build useful applications while learning new technologies.",
                memberList: [10, 8],
                applicationList: []
            },
            {
                id: 3,
                teamName: "Jorge's Last Stand",
                description: "A one-man development team determined to conquer the hackathon. Armed with Python, C++, Java, and an unreasonable amount of confidence, Jorge is ready to take on the competition.",
                memberList: [67],
                applicationList: []
            }
        ],

        "events.json": [
            {
                id: 1,
                name: "Opening Ceremony",
                description: "Welcome to the RGV Hackathon! Join us for an introduction to the event, an overview of the competition tracks, and important announcements. Organizers will explain the schedule, judging criteria, and available resources.",
                locations: "Auditorium 101",
                startDate: "2026-11-19",
                endDate: "2026-11-19",
                timestart: "09:00",
                timeend: "10:00",
                imgs: [
                    "/images/events/opening-1.jpg",
                    "/images/events/opening-2.jpg",
                    "/images/events/opening-3.jpg"
                ],
                participantNum: 6,
                participants: [1, 2, 3, 67, 10, 8]
            },
            {
                id: 2,
                name: "Team Building and Networking",
                description: "Meet fellow developers, designers, and entrepreneurs participating in the hackathon. This session helps participants find teammates, share project ideas, and connect with others who have complementary skills.",
                locations: "Room 204",
                startDate: "2026-11-19",
                endDate: "2026-11-19",
                timestart: "10:30",
                timeend: "11:30",
                imgs: [
                    "/images/events/networking-1.jpg",
                    "/images/events/networking-2.jpg",
                    "/images/events/networking-3.jpg"
                ],
                participantNum: 5,
                participants: [1, 2, 3, 10, 8]
            },
            {
                id: 3,
                name: "Full Stack Development Workshop",
                description: "Learn practical techniques for building modern web applications using HTML, CSS, JavaScript, Node.js, and Express. Participants will explore frontend and backend development, API integration, and useful tools for the upcoming competition.",
                locations: "Computer Lab 305",
                startDate: "2026-11-19",
                endDate: "2026-11-19",
                timestart: "13:30",
                timeend: "14:30",
                imgs: [
                    "/images/events/workshop-1.jpg",
                    "/images/events/workshop-2.jpg",
                    "/images/events/workshop-3.jpg"
                ],
                participantNum: 4,
                participants: [1, 3, 67, 10]
            },
            {
                id: 4,
                name: "RGV Hackathon 2026",
                description: "The main event of the RGV Hackathon! Teams will have 24 hours to design, develop, and complete innovative projects in Social Impact, Business, and Artificial Intelligence. Participants can collaborate, receive mentorship, and compete for prizes while bringing their ideas to life.",
                locations: "Innovation Hall 100",
                startDate: "2026-11-20",
                endDate: "2026-11-21",
                timestart: "09:00",
                timeend: "09:00",
                imgs: [
                    "/images/events/hackathon-1.jpg",
                    "/images/events/hackathon-2.jpg",
                    "/images/events/hackathon-3.jpg"
                ],
                participantNum: 6,
                participants: [1, 2, 3, 67, 10, 8]
            },
            {
                id: 5,
                name: "Cybersecurity Capture the Flag Challenge",
                description: "Test your cybersecurity skills in a series of challenges involving cryptography, web security, and problem-solving. Participants will compete to discover hidden flags, solve puzzles, and earn points. Beginners and experienced developers are welcome.",
                locations: "Computer Lab 305",
                startDate: "2026-11-21",
                endDate: "2026-11-21",
                timestart: "10:00",
                timeend: "11:00",
                imgs: [
                    "/images/events/ctf-1.jpg",
                    "/images/events/ctf-2.jpg",
                    "/images/events/ctf-3.jpg"
                ],
                participantNum: 4,
                participants: [1, 3, 67, 10]
            },
            {
                id: 6,
                name: "Hackathon Results Announcement",
                description: "The moment everyone has been waiting for! Join us as the judges announce the winning teams for the Social Impact, Business, and Artificial Intelligence tracks. First, second, and third-place winners will be recognized for their achievements and awarded prizes.",
                locations: "Auditorium 101",
                startDate: "2026-11-21",
                endDate: "2026-11-21",
                timestart: "15:00",
                timeend: "16:00",
                imgs: [
                    "/images/events/results-1.jpg",
                    "/images/events/results-2.jpg",
                    "/images/events/results-3.jpg"
                ],
                participantNum: 6,
                participants: [1, 2, 3, 67, 10, 8]
            },
            {
                id: 7,
                name: "Closing Ceremony and Celebration",
                description: "Celebrate the conclusion of the RGV Hackathon with fellow participants, mentors, and organizers. This final gathering recognizes everyone's hard work, provides opportunities for networking, and highlights the accomplishments of the event.",
                locations: "Conference Hall 202",
                startDate: "2026-11-21",
                endDate: "2026-11-21",
                timestart: "16:30",
                timeend: "17:30",
                imgs: [
                    "/images/events/closing-1.jpg",
                    "/images/events/closing-2.jpg",
                    "/images/events/closing-3.jpg"
                ],
                participantNum: 6,
                participants: [1, 2, 3, 67, 10, 8]
            }
        ]



    }
}