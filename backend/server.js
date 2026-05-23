const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SmartSpend API running");
});

app.get("/transactions", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM transactions"
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});