const { Router } = require('express');
const { getAllDogs, getTemperaments, getAllDogsByName, getDogByID, postDog, deleteDog, putDog } = require('../controllers/controller.js');

const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        getTemperaments();
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
        const { name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments } = req.body;
        const newDog = await postDog(name, image, minHeight, maxHeight, minWeight, maxWeight, life_span);
        await newDog.addTemperaments(temperaments);
        res.status(200).send(newDog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const delDog = await deleteDog(id);
        res.status(200).json({ message: `Se eliminó el perro de ID ${delDog}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperament } = req.body;
        const updatedog = putDog(id, name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperament);
        res.status(200).json({ message: `Se actualizó el perro ${updatedog}`},);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = router;