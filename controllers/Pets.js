let petsData = require('../data/pets.json');
const filename = './data/pets.json';
const helper = require('../utils/helper')

class Pets {
    static getPets() {
        return petsData;
    }

    static insertPet(data) {
        return new Promise((resolve, reject) => {
            try {
                const id = helper.getNewId(petsData);
                const date = {
                    createdAt: helper.newDate(),
                    updatedAt: helper.newDate()
                };
                data = { id, ...date, ...data }
                petsData.push(data);
                helper.writeJSONFile(filename, petsData);
                resolve(data);
            }
            catch(err){
                reject(err)
            }
        });
    }

    static updatePet(id, data) {
        return new Promise((resolve, reject) => {
            helper.mustBeInArray(petsData, id)
                .then(post => {
                    data.pets = data.pets ? data.pets.map(id => ({ id })) : []
                    const index = petsData.findIndex(p => p.id == post.id)
                    id = { id: post.id }
                    const date = {
                        createdAt: post.createdAt,
                        updatedAt: helper.newDate()
                    }
                    petsData[index] = { ...id, ...date, ...data }
                    helper.writeJSONFile(filename, petsData)
                    resolve(petsData[index])
                })
                .catch(err => reject(err))
        })
    }

    static deletePet(id) {
        return new Promise((resolve, reject) => {
            helper.mustBeInArray(petsData, id)
                .then(() => {
                    petsData = petsData.filter(p => p.id !== id)
                    helper.writeJSONFile(filename, petsData)
                    resolve({ message: `${id} deleted successfully` })
                })
                .catch(err => reject(err))
        })
    }

    static find(id) {
        return helper.mustBeInArray(petsData, id);
    }
}

module.exports = {
    getPets: Pets.getPets,
    insertPet: Pets.insertPet,
    find : Pets.find,
    updatePet: Pets.updatePet,
    deletePet: Pets.deletePet
}