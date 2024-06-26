// Create User model
const User = require('../models/user');

// CRUD operations
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.create({ username });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addExercise = async (req, res) => {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create the new exercise object
        const newExercise = {
            description: description.toString(),
            duration: Number(duration),
            date: date ? new Date(date) : new Date()
        };

        // Add the exercise to the user's exercises array
        user.exercises.push(newExercise);

        // Save the updated user document
        await user.save();

        // Return only the newly added exercise along with user's _id and username
        res.json({
            _id: user._id,
            username: user.username,
            description: newExercise.description,
            duration: newExercise.duration,
            date: newExercise.date.toDateString()
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getExerciseLog = async (req, res) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        let log = user.exercises;

        if (from) {
            log = log.filter(exercise => new Date(exercise.date) >= new Date(from));
        }

        if (to) {
            log = log.filter(exercise => new Date(exercise.date) <= new Date(to));
        }

        if (limit) {
            log = log.slice(0, parseInt(limit, 10));
        }

        res.json({
            username: user.username,
            count: log.length,
            _id: user._id,
            log: log.map(exercise => ({
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString()
            }))
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getUsers, createUser, addExercise, getExerciseLog };
