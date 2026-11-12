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
        ]



    }
}