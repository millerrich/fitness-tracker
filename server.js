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

app.get("/api/workouts", (req, res) => {
    db.Workout.find()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body);
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body }}, { new: true })
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).limit(10)
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});





app.listen(PORT, () => {
    console.log("listening at http://localhost:" + PORT);
});