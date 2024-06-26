const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    exercises: [{
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        date: { type: Date, default: Date.now }
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;