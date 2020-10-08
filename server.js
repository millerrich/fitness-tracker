const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


app.get("/stats", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.get("/exercise", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.post("/api/workouts", (req, res) => {
    db.Workout.insertMany({}, function(err, data) {
        if (err) throw err;
        return res.json("success");
    });
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, function(err, data) {
        if (err) throw err;
        return res.json(data);
    });
});

app.listen(PORT, () => {
    console.log("listening at http://localhost:" + PORT);
});