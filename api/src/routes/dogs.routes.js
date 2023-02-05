const { Router } = require('express');
const { getAllDogs, getTemperaments, getAllDogsByName, getDogByID, postDog, deleteDog, putDog } = require('../controllers/controller.js');
const { Temperament } = require('../db.js')

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
        getTemperaments();
        const { name, image, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, temperaments } = req.body;
        if (temperaments.length === 0) {
            throw new Error("The dog must have at least one temperament");
        }
        const newDog = await postDog(name, image, parseInt(minHeight), parseInt(maxHeight), parseInt(minWeight), parseInt(maxWeight), parseInt(minLifeSpan), parseInt(maxLifeSpan));
        const temp = await Temperament.findAll({
            where: {
                name: temperaments
            }
        })
        await newDog.addTemperament(temp);
        res.status(200).json({ message: `Created dog ${newDog.name} with id ${newDog.id}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const delDog = await deleteDog(id);
        res.status(200).json({ message: `Removed dog from ID ${delDog}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, temperaments, temperamentsLast } = req.body;
        if (temperaments.length === 0) {
            throw new Error("The dog must have at least one temperament");
        }
        const updatedog = await putDog(id, name, image, parseInt(minHeight), parseInt(maxHeight), parseInt(minWeight), parseInt(maxWeight), parseInt(minLifeSpan), parseInt(maxLifeSpan));
        const tempLast = await Temperament.findAll({
            where: {
                name: temperamentsLast
            }
        })
        const temp = await Temperament.findAll({
            where: {
                name: temperaments
            }
        })
        await updatedog.removeTemperament(tempLast);
        await updatedog.addTemperament(temp);
        res.status(200).json({ message: `Updated dog ${updatedog.name}` },);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = router;