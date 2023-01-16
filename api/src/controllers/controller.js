const axios = require('axios');
const { Dogs, Temperaments } = require('../db.js');

const getDogsApi = async () => {
    try {
        const api = await axios.get('https://api.thedogapi.com/v1/breeds');
        const allDogs = api.data?.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                image: image.url,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament
            };
        });
        return allDogs;
    } catch {
        throw new Error('No se puede obtener la información de los perros');
    };
};

const getAllDogs = async () => {
    try {
        const allDogsApi = await getDogsApi();
        const dogsDb = await Dogs.findAll();
        const allDogsDb = dogsDb?.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span,
            };
        })
        return [...allDogsApi, ...allDogsDb];
    } catch (error) {
        throw new Error(error);
    }
}

const getDogByName = async (name) => {
    try {
        // const api = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
        // if (api.data.length !== 1) {
        //     throw new Error(`No se puede obtener la información del perro ${name}`)
        // } else {
        //     const dog = {
        //         id: api.data[0].id,
        //         name: api.data[0].name,
        //         height: api.data[0].height.metric,
        //         weight: api.data[0].weight.metric,
        //         life_span: api.data[0].life_span
        //     };
        //     return dog;
        // }
        const dogsApi = await getDogsApi();
        const dogFindName = dogsApi.find(dog => dog.name === name);
        if (!dogFindName) {
            throw new Error(`No se puede obtener la información del perro ${name}`);
        };
        return dogFindName;
    } catch (error) {
        throw new Error(error);
    };
};

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

module.exports = {
    getDogByName,
    getDogByID,
    getTemperaments,
    getAllDogs
}