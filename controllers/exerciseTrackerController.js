const mongoose = require('mongoose');

let users = [];

const getUsers = (req, res) => {
    res.json(users);

};

const createUser = (req, res) => {
    const { username } = req.body;

    // Validation check
    if (!username) {
        return res.json({ error: "Username is required" });
    }

    // Duplication check
    if (users.find((u) => u.username === username)) {
        return res.json({ error: "User exists" });
    }

    const user = {  
        _id: new mongoose.Types.ObjectId().toString(),
        username,
        exercises: []
    };
    
    users.push(user);
    res.json(user);
}

const addExercise = (req, res) => {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    const user = users.find((u) => u._id === _id);

    if (!user) {
        return res.json({ error: "User not found" });
    }

    const exercise = {
        description,
        duration: parseInt(duration),
        date: date ? new Date(date) : new Date()
    }

    if (!user.exercises) {
        user.exercises = [];
    }

    user.exercises.push(exercise);
    res.json(user);
};

const getExerciseLog = (req, res) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    const user = users.find((u) => u._id === _id);
    if (!user) {
        return res.json({ error: "User not found" });
    }

    let log = user.exercises.map(exercise => ({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
    }))

    if (from) {
        const fromDate = new Date(from);
        log = log.filter(exercise => new Date(exercise.date) >= fromDate);
    }

    if (to) {
        const toDate = new Date(to);
        log = log.filter(exercise => new Date(exercise.date) <= toDate);
    }

    if (limit) {
        log = log.slice(0, parseInt(limit));
    }

    res.json({
        _id: user._id,
        username: user.username,
        count: log.length,
        log: log
    })
}

module.exports = { getUsers, createUser, addExercise, getExerciseLog };