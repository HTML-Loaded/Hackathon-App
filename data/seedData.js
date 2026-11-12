import bcrypt from "bcrypt"

export const seedData = async () => {
    return {
        "users.json": [
            {
                id: 1,
                teamId: 0,
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
                teamId: 0,
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
                teamId: 0,
                profilePicture: "https://media.tenor.com/QVXwXVq-1EYAAAAM/tole-tole-mei-mei.gif",
                name: "Leo",
                email: "leo@example.com",
                password: await bcrypt.hash("mypassword", 10),
                skills: ["HTML", "CSS", "Javascript", "NodeJS + Express", "Procrastination"],
                description: "Full stack pro developer #1 on hackerrank fr"
            },
            {
                id: 67,
                teamId: 0,
                profilePicture: "https://media1.tenor.com/m/vdPXShwp4q4AAAAd/orospu-esek-e%C5%9F%C5%9F%C5%9Fekk.gif",
                name: "Jorge",
                email: "jorge@example.com",
                password: await bcrypt.hash("aPassword", 10),
                skills: ["Python", "C++", "Java", "Volleball setter", "boardgame enthusiast"],
                description: "Loveable guy that struggles tying his shoes"
            }
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
        ]
    }
}