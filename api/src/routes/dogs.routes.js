const { Router } = require('express');
const { getAllDogs, getDogByName, getDogByID } = require('../controllers/controller.js');

const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const dogName = await getDogByName(name);
            res.status(200).send(dogName);
        } else if (!name) {
            const allDogs = await getAllDogs();
            res.status(200).send(allDogs);
        };
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    };
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const dogFind = await getDogByID(id);
        res.status(200).send(dogFind);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;