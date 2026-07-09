const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.dev" });

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to Sample API");
});

app.get("/health", (req, res) => {
    res.json({
        status: "Healthy",
        environment: process.env.NODE_ENV
    });
});

app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "John" },
        { id: 2, name: "Alice" }
    ]);
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;