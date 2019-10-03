let ownersData = require('../data/owners.json')
const fs = require('fs');
const filename = './data/owners.json';
const helper = require('../utils/helper')

class Owners {
    static getOwners() {
        return ownersData;
    }

    static createOwner(data) {
        return new Promise((resolve, reject) => {
            const id = helper.getNewId(ownersData);
            const date = {
                createdAt: helper.newDate(),
                updatedAt: helper.newDate()
            };
            data.pets = data.pets ? data.pets.map(id => ({ id })) : []
            data = { id, ...date, ...data }
            ownersData.push(data);
            let modifiedData = JSON.stringify(ownersData);
            fs.writeFileSync(filename, modifiedData, 'utf8', (err) => {
                if (err) {
                    reject(err)
                }
            })
            return resolve(data);
        });
    }

    static updateOwner(id, data) {
        return new Promise((resolve, reject) => {
            helper.mustBeInArray(ownersData, id)
                .then(post => {
                    data.pets = data.pets ? data.pets.map(id => ({ id })) : []
                    const index = ownersData.findIndex(p => p.id == post.id)
                    id = { id: post.id }
                    const date = {
                        createdAt: post.createdAt,
                        updatedAt: helper.newDate()
                    }
                    ownersData[index] = { ...id, ...date, ...data }
                    helper.writeJSONFile(filename, ownersData)
                    resolve(ownersData[index])
                })
                .catch(err => reject(err))
        })
    }

    static deleteOwner(id) {
        return new Promise((resolve, reject) => {
            helper.mustBeInArray(ownersData, id)
                .then(() => {
                    ownersData = ownersData.filter(p => p.id !== id)
                    helper.writeJSONFile(filename, ownersData)
                    resolve({ message: `${id} deleted successfully` })
                })
                .catch(err => reject(err))
        })
    }
}

module.exports = {
    GetOwners: Owners.getOwners,
    CreateOwner: Owners.createOwner,
    UpdateOwner: Owners.updateOwner,
    DeleteOwner: Owners.deleteOwner
}