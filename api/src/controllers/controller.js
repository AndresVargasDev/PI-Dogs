const axios = require('axios');
const { Dogs, Temperaments } = require('../db.js');

const getDogsApi = async () => {
    try {
        const api = await axios.get('https://api.thedogapi.com/v1/breeds');
        const allDogs = api.data?.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                reference_image_id: dog.reference_image_id,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament
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
        const result = await Dogs.findAll();
        const allDogsDb = result?.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span
            };
        })
        return [...allDogsApi, ...allDogsDb];
    } catch (error) {
        throw new Error(error);
    }
}

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
        const dogsApi = await getDogsApi();
        const dogFindId = dogsApi.find(dog => dog.id === parseInt(id));
        if (!dogFindId) {
            throw new Error(`No se puede obtener la información del perro de ${id}`);
        }
        return dogFindId;
    } catch (error) {
        throw new Error(error);
    };
};

const getTemperaments = async () => {
    try {
        const dogsApi = await getDogsApi();
        let arrayTemperament = [];
        dogsApi.map(dog => {
            if (dog.temperament) {
                arrayTemperament.push(...dog.temperament.split(/\s*,\s*/))
            };
        });
        arrayTemperament.map(temperamentName => {
            Temperaments.findOrCreate({
                where: {
                    name: temperamentName
                },
            });
        });
    } catch (error) {
        throw new Error(error);
    }
}


const postDog = async (name, image, height, weight, life_span) => {
    try {
        const newDog = await Dogs.create({
            name,
            image,
            height,
            weight,
            life_span
        })
        return newDog;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAllDogsByName,
    getDogByID,
    getTemperaments,
    getAllDogs,
    postDog
}