const express = require('express');
const cors = require('cors');



const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const users = [];


app.get("/api/users", (req, res) => {
    res.json(users);
});

app.post("/api/register", (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find((user) => user.username === username);
    if(existingUser) {
        res.status(400).json({ message: "User already exists" });
    }

    const newUser = {
        username,
        password,
    };

    users.push(newUser);    

    res.status(201).json({ message: "User created" });
});


app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);
    if(!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if(user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
});




app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

