const { Router } = require('express');
const { getAllDogs, getAllDogsByName, getDogByID, postDog } = require('../controllers/controller.js');

const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const dogsName = await getAllDogsByName(name);
            res.status(200).send(dogsName);
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
    try {
        const dogFind = await getDogByID(id);
        res.status(200).send(dogFind);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, image, height, weight, life_span } = req.body;
        const newDog = await postDog(name, image, height, weight, life_span);
        res.status(200).send(newDog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

})

module.exports = router;