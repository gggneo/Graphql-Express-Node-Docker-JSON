import ownersController from '../../controllers/Owners';
import petsController from '../../controllers/Pets';

export const resolvers = {
    Query: {
        getOwner: async (parent, { id }, context, info) => {
            return await ownersController.getOwnerbyId(id)
                .then(owner => owner)
                .catch(err => err);
        },
        owners() {
            return ownersController.GetOwners()
        },
        pets() {
            return petsController.getPets();
        }
    },
    Owner: {
        pets(source) {
            if (!source.pets || !source.pets.length) {
                return
            }
            return Promise.all(source.pets.map(({ id }) => petsController.find(id)))
        }
    },
    Mutation: {
        createOwner(source, args) {
            return ownersController.CreateOwner(args.input)
        },
        updateOwner(source, args) {
            return ownersController.UpdateOwner(args.id, args.input)
        },
        deleteOwner(source, args) {
            return ownersController.DeleteOwner(args.id)
        },
        truncate(source, args) {
            if (args.type === 'owner') {
                return ownersController.truncateOwner()
            }
            if (args.type === 'pet') {
                return petsController.truncatePet()
            }
        },
        createPet(source, args) {
            return petsController.insertPet(args.input)
        },
        updatePet(source, args) {
            return petsController.updatePet(args.id, args.input)
        },
        deletePet(source, args) {
            return petsController.deletePet(args.id)
        }
    }
}