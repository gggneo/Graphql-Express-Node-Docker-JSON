import { gql } from 'apollo-server-express'
import ownersController from './controllers/Owners';
import petsController from './controllers/Pets';

export const typeDefs = gql`
  type Owner {
    id: Int,
    name: String,
    address: String,
    email: String,
    mobile: String,
    pets: [Pet]
  }

  type Pet {
     id: Int,
     name: String,
     age: Int,
     breed: String,
     colour: String
  }

  type Message {
    message: String
  }

  type Query {
    owners: [Owner],
    pets: [Pet]
  }

  input CreateOwnerInput {
    id: Int,
    name: String,
    address: String,
    email: String,
    mobile: String,
    pets: [Int]
  }

  input CreatePetInput {
    id: Int,
    name: String,
    age: Int,
    breed: String,
    colour: String
  }

  type Mutation {
    createOwner(input: CreateOwnerInput!): Owner
    updateOwner(id: Int!, input: CreateOwnerInput!): Owner
    deleteOwner(id: Int!): Message
    createPet(input: CreatePetInput!): Pet
    updatePet(id:Int!, input:CreatePetInput!): Pet
    deletePet(id: Int!): Message
  }
`

export const resolvers = {
  Query: {
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
