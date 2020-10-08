const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/stats", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.get("/exercise", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.listen(PORT, () => {
    console.log("listening at http://localhost:" + PORT);
});