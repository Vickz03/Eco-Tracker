const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    totalFootprint: {
        type: Number,
        default: 0
    },
    monthlyGoal: {
        type: Number,
        default: 0
    },
    baselineScore: {
        type: Number,
        default: 0
    },
    lifestyleCategory: {
        type: String,
        default: 'Not Set'
    },
    surveyAnswers: {
        type: Object,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
