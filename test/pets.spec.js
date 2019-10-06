const chai = require('chai');

const expect = chai.expect;
const url = `http://localhost:3500`;
const request = require('supertest')(url);

describe('Pets', () => {
    it('Truncate all pets data', async () => {
        const result = await request.post('/graphql')
            .send({
                "operationName": "Truncate",
                "query": "mutation Truncate($type: String!) { truncate(type: $type) { message }}",
                "variables": { "type": "pet" }
            })

        expect(result.status).to.equal(200);
        expect(result.body.data.truncate).to.have.property('message')
    })

    it('Create a pet', async () => {
        const result = await request.post('/graphql')
            .send({
                "operationName": "CreatePet",
                "variables": { "input": { "name": "Kicchu", "breed": "Persian", "age": 10, "colour": "red" } },
                "query": "mutation CreatePet($input: CreatePetInput!) { createPet(input: $input) { name age breed colour }}"
            })
        expect(result.status).to.equal(200);
        expect(result.body.data.createPet).to.deep.equal({ "name": "Kicchu", "breed": "Persian", "age": 10, "colour": "red" });
    })

    it('Update a pet', async () => {
        const result = await request.post('/graphql')
            .send({
                "operationName": "UpdatePet",
                "variables": { "id": 1, "input": { "name": "Kicchu", "breed": "Indian", "age": 10, "colour": "red" } },
                "query": "mutation UpdatePet($id: Int!,$input: CreatePetInput!) { updatePet(id: $id, input: $input) { name age breed colour }}"
            })
        expect(result.status).to.equal(200);
        expect(result.body.data.updatePet).to.deep.equal({ "name": "Kicchu", "breed": "Indian", "age": 10, "colour": "red" });
    })

    it('Truncate all pets data', async () => {
        const result = await request.post('/graphql')
            .send({
                "operationName": "Truncate",
                "query": "mutation Truncate($type: String!) { truncate(type: $type) { message }}",
                "variables": { "type": "pet" }
            })

        expect(result.status).to.equal(200);
        expect(result.body.data.truncate).to.have.property('message')
    })

    // it('Returns owners with id = 1', async () => {
    //     const result = await request.post('/graphql')
    //         .send({ query: '{ getOwner(id: 1) { id name email  } }' })
    //     expect(result.status).to.equal(200);
    //     expect(result.body.data.getOwner).to.have.property('id')
    //     expect(result.body.data.getOwner).to.have.property('name')
    //     expect(result.body.data.getOwner).to.have.property('email')
    //     expect(result.body.data.getOwner).to.not.have.property('pets');
    // })

    // it('Returns all owners', async () => {
    //     const result = await request.post('/graphql')
    //         .send({ query: '{ owners { id name email } }' })
    //     expect(result.status).to.equal(200);
    //     expect(result.body.data.owners).to.have.lengthOf(1);
    // })

    // it('Truncate all owners data', async () => {
    //     const result = await request.post('/graphql')
    //         .send({
    //             "operationName": "Truncate",
    //             "query": "mutation Truncate($type: String!) { truncate(type: $type) { message }}",
    //             "variables": { "type": "owner" }
    //         })
    //     expect(result.status).to.equal(200);
    //     expect(result.body.data.truncate).to.have.property('message');
    // })
});