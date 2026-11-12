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
                password: await bcrypt.hash("password123", 10),
                roles: "p",
                skills: ["JavaScript", "Python"],
                description: ""
            },
            {
                id: 2,
                teamId: 1,
                profilePicture: "/images/default-profile.png",
                name: "Jane Doe",
                email: "jane@example.com",
                password: await bcrypt.hash("password456", 10),
                roles: "participant",
                skills: ["HTML", "CSS"],
                description: ""
            },
            {
                id: 3,
                teamId: 1,
                profilePicture: "https://media.tenor.com/QVXwXVq-1EYAAAAM/tole-tole-mei-mei.gif",
                name: "Leo",
                email: "leo@example.com",
                password: await bcrypt.hash("mypassword", 10),
                skills: ["HTML", "CSS", "Javascript", "NodeJS + Express", "Procrastination"],
                description: "Full stack pro developer #1 on hackerrank fr"
            },
            {
                id: 67,
                teamId: 3,
                profilePicture: "https://media1.tenor.com/m/vdPXShwp4q4AAAAd/orospu-esek-e%C5%9F%C5%9F%C5%9Fekk.gif",
                name: "Jorge",
                email: "jorge@example.com",
                password: await bcrypt.hash("aPassword", 10),
                skills: ["Python", "C++", "Java", "Volleball setter", "boardgame enthusiast"],
                description: "Loveable guy that struggles tying his shoes"
            },
            {
                id: 10,
                teamId: 2,
                profilePicture: "",
                name: "Ivan",
                email: "Ivan@example.com",
                password: await bcrypt.hash("bPassword", 10),
                skills: ["vibe coding"],
                description: ""
            },
            {
                id: 8,
                teamId: 2,
                profilePicture: "",
                name: "May",
                email: "May@example.com",
                password: await bcrypt.hash("cPassword", 10),
                skills: ["Ruby", "Assembly"],
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
                memberList: [1, 2, 3]
            },
            {
                id: 2,
                teamName: "Valley Innovators",
                description: "We combine different programming skills to develop creative solutions for local businesses. Our goal is to build useful applications while learning new technologies.",
                memberList: [10, 8]
            },
            {
                id: 3,
                teamName: "Jorge's Last Stand",
                description: "A one-man development team determined to conquer the hackathon. Armed with Python, C++, Java, and an unreasonable amount of confidence, Jorge is ready to take on the competition.",
                memberList: [67]
            }
        ]



    }
}