const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const travelFactors = require('../data/travelFactors.json');
const foodFactors = require('../data/foodFactors.json');
const electricityFactors = require('../data/electricityFactors.json');
const axios = require('axios');

// @route   POST api/calc/travel
// @desc    Calculate travel emissions
router.post('/travel', auth, async (req, res) => {
    const { mode, distance, start, end } = req.body;
    let finalDistance = distance;

    // If start/end provided and API key exists, fetch distance
    if (start && end && process.env.GOOGLE_MAPS_API_KEY) {
        try {
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${start}&destinations=${end}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
            const response = await axios.get(url);
            if (response.data.rows[0].elements[0].status === 'OK') {
                // Distance in km
                finalDistance = response.data.rows[0].elements[0].distance.value / 1000;
            }
        } catch (err) {
            console.error("Google Maps API Error", err);
            // Fallback to manual distance if provided, else error
            if (!finalDistance) return res.status(400).json({ msg: "Could not fetch distance" });
        }
    }

    const factor = travelFactors[mode] || 0;
    const carbonAmount = finalDistance * factor;

    res.json({
        mode,
        distance: finalDistance,
        carbonAmount,
        unit: 'kg CO2'
    });
});

// @route   POST api/calc/electricity
// @desc    Calculate electricity emissions
router.post('/electricity', auth, async (req, res) => {
    const { appliances } = req.body; // Array of { type, hours, count }
    let totalCarbon = 0;
    let totalKWh = 0;

    appliances.forEach(app => {
        const data = electricityFactors[app.type];
        if (data) {
            // Watts * Hours * Count / 1000 = kWh
            const dailyKWh = (data.watts * app.hours * app.count) / 1000;
            totalKWh += dailyKWh;
            totalCarbon += dailyKWh * data.factor; // 0.5 kg per kWh avg
        }
    });

    res.json({
        totalKWh,
        carbonAmount: totalCarbon,
        unit: 'kg CO2'
    });
});

// @route   GET api/calc/food
// @desc    Get food list
router.get('/food', auth, (req, res) => {
    res.json(foodFactors);
});

// @route   POST api/calc/food
// @desc    Calculate food emissions
router.post('/food', auth, async (req, res) => {
    const { foodName, quantity } = req.body; // quantity in kg or servings
    const food = foodFactors.find(f => f.name.toLowerCase() === foodName.toLowerCase());

    if (!food) return res.status(404).json({ msg: "Food item not found" });

    const carbonAmount = quantity * food.factor;

    res.json({
        food: food.name,
        quantity,
        carbonAmount,
        unit: 'kg CO2'
    });
});

module.exports = router;
