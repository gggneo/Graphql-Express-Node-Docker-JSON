import { gql } from 'apollo-server-express'

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
    getOwner(id: Int!): Owner!,
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
    truncate(type: String!): Message
  }
`