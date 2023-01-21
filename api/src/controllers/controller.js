const axios = require('axios');
const { Dog, Temperament } = require('../db.js');

const getDogsApi = async () => {
    try {
        const api = await axios.get('https://api.thedogapi.com/v1/breeds');
        const allDogs = api.data?.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                minHeight: parseInt(dog.height.metric.split("-")[0]),
                maxHeight: parseInt(dog.height.metric.split("-")[1]),
                minWeight: parseInt(dog.weight.metric.split("-")[0]),
                maxWeight: parseInt(dog.weight.metric.split("-")[1]),
                life_span: dog.life_span,
                temperaments: dog.temperament
            };
        });
        return allDogs;
    } catch {
        throw new Error('No se puede obtener la información de los perros');
    }
}

const getAllDogs = async () => {
    try {
        const allDogsApi = await getDogsApi();
        const allDogsDb = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        const allDogsDbWithTemps = allDogsDb.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image,
                minHeight: dog.minHeight,
                maxHeight: dog.maxHeight,
                minWeight: dog.minWeight,
                maxWeight: dog.maxWeight,
                life_span: dog.life_span,
                temperaments: dog.temperaments.map(e => { return e.name }).join(', ')               
            }
        })
        return [...allDogsApi, ...allDogsDbWithTemps];
    } catch (error) {
        throw new Error(error);
    };
};

const getAllDogsByName = async (name) => {
    try {
        const allDogs = await getAllDogs();
        const filterName = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        if (filterName.length > 0) {
            return filterName
        } else {
            throw new Error(`No se encontró el perro ${name}`)
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getDogByID = async (id) => {
    try {
        const allDogs = await getAllDogs();
        const filterName = allDogs.filter(dog => dog.id == id)
        if (filterName.length > 0) {
            return filterName[0];
        } else {
            throw new Error(`No se encontró el perro de ID ${id}`)
        }
    } catch (error) {
        throw new Error(error);
    }
};

const getTemperaments = async () => {
    try {
        const dogsApi = await getDogsApi();
        let arrayTemperament = [];
        dogsApi.map(dog => {
            if (dog.temperaments) {
                arrayTemperament.push(...dog.temperaments.split(", "))
            };
        });
        arrayTemperament.map(temperamentName => {
            Temperament.findOrCreate({
                where: {
                    name: temperamentName,
                },
            });
        });
    } catch (error) {
        throw new Error(error);
    }
}

const postDog = async (name, image, minHeight, maxHeight, minWeight, maxWeight, life_span) => {
    try {
        const dogsApiDB = await getAllDogs();
        const dogName = dogsApiDB.find(dog => dog.name === name);
        if (dogName) {
            throw new Error(`El perro ${name} ya existe en la API o en la Base de Datos`);
        }
        const newDog = await Dog.create({
            name,
            image,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            life_span
        });
        return newDog;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteDog = async (id) => {
    try {
        const delDog = await Dog.destroy({
            where: {
                id,
            }
        })
        return id;
    } catch (error) {
        throw new Error(error);
    }
}

const putDog = async (id, name, image, minHeight, maxHeight, minWeight, maxWeight, life_span) => {
    try {
        const updateDog = await Dog.findByPk(id);
        updateDog.name = name;
        updateDog.image = image;
        updateDog.minHeight = minHeight;
        updateDog.maxHeight = maxHeight;
        updateDog.minWeight = minWeight;
        updateDog.maxWeight = maxWeight;
        updateDog.life_span = life_span
        await updateDog.save();
        return updateDog;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAllDogsByName,
    getDogByID,
    getTemperaments,
    getAllDogs,
    postDog,
    deleteDog,
    putDog
}