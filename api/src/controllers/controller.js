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
                minLifeSpan: parseInt(dog.life_span.split("-")[0]),
                maxLifeSpan: parseInt(dog.life_span.split("-")[1]),
                temperaments: dog.temperament,
                from: "API"
            };
        });
        return allDogs;
    } catch {
        throw new Error("Can't get dog information");
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
                minLifeSpan: dog.minLifeSpan,
                maxLifeSpan: dog.maxLifeSpan,
                temperaments: dog.temperaments.map(temp => { return temp.name }).join(', '),
                from: dog.from
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
            throw new Error(`Dog not found ${name}`)
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
            throw new Error(`ID dog not found, ID = ${id}`)
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

const postDog = async (name, image, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan) => {
    try {
        const dogsApiDB = await getAllDogs();
        const nameTrim = name.trim();
        const dogName = dogsApiDB.find(dog => dog.name === name);
        const dogNameTrim = dogsApiDB.find(dog => dog.name === nameTrim);
        if (dogName || dogNameTrim) {
            throw new Error(`Dog ${name} already exists in the API or in the Database`);
        }
        else if (!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !minLifeSpan || !maxLifeSpan) {
            throw new Error("You must fill in all the required information");
        }
        else if (minHeight <= 0 || maxHeight <= 0 || minWeight <= 0 || maxWeight <= 0 || minLifeSpan <= 0 || maxLifeSpan <= 0) {
            throw new Error("The height, weight ow life span value cannot be negative");
        }
        else if (minHeight >= maxHeight) {
            throw new Error("The minimum height is greater than or equal to the maximum height, please validate data");
        }
        else if (minWeight >= maxWeight) {
            throw new Error("The minimum weight is greater than or equal to the maximum weight, please validate data");
        }
        else if (minLifeSpan >= maxLifeSpan) {
            throw new Error("The minimum life span is greater than or equal to the maximum weight, please validate data");
        }
        const newDog = await Dog.create({
            name,
            image,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minLifeSpan,
            maxLifeSpan,
            from: "DataBase"
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

const putDog = async (id, name, image, minHeight, maxHeight, minWeight, maxWeight, minLifepan, maxLifepan) => {
    try {
        const updateDog = await Dog.findByPk(id);
        updateDog.name = name;
        updateDog.image = image;
        updateDog.minHeight = minHeight;
        updateDog.maxHeight = maxHeight;
        updateDog.minWeight = minWeight;
        updateDog.maxWeight = maxWeight;
        updateDog.minLifepan = minLifepan;
        updateDog.minLifepan = minLifepan;
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