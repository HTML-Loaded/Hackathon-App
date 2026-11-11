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