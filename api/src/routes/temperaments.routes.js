const { Router } = require('express');
const { getTemperaments } = require('../controllers/controller.js');

const router = Router();
router.get('/', async (req, res) => {
    try {
        getTemperaments();
        res.status(200).json({message:"Se crearon/añadieron los temperamentos"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;