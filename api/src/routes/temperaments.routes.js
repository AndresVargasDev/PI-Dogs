const { Router } = require('express');
const { getTemperaments } = require('../controllers/controller.js');
const { Temperament } = require('../db.js');

const router = Router();
router.get('/', async (req, res) => {
    try {
        await getTemperaments();
        const allTemperaments = await Temperament.findAll()
        res.status(200).json(allTemperaments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;