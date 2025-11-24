const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Activity = require('../models/Activity');
const User = require('../models/User');

// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
    transportation: 0.21, // per km (avg car)
    food: 2.5, // per meal (avg non-veg)
    electricity: 0.5, // per kWh
    waste: 1.5, // per kg
    other: 1.0 // generic
};

// @route   GET api/activities
// @desc    Get all activities for user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const activities = await Activity.find({ user: req.user.id }).sort({ date: -1 });
        res.json(activities);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/activities
// @desc    Add new activity
// @access  Private
router.post('/', auth, async (req, res) => {
    const { type, value, unit, date } = req.body;

    try {
        // Calculate carbon amount
        const factor = EMISSION_FACTORS[type] || 1.0;
        const carbonAmount = value * factor;

        const newActivity = new Activity({
            type,
            value,
            unit,
            carbonAmount,
            date,
            user: req.user.id
        });

        const activity = await newActivity.save();

        // Update user total footprint
        await User.findByIdAndUpdate(
            req.user.id,
            { $inc: { totalFootprint: carbonAmount } }
        );

        res.json(activity);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/activities/:id
// @desc    Delete activity
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({ msg: 'Activity not found' });
        }

        // Check user
        if (activity.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Remove from user total footprint
        await User.findByIdAndUpdate(
            req.user.id,
            { $inc: { totalFootprint: -activity.carbonAmount } }
        );

        await activity.deleteOne();

        res.json({ msg: 'Activity removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
