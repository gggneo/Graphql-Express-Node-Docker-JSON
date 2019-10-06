const chai = require('chai');

const expect = chai.expect;
const url = `http://localhost:3500`;
const request = require('supertest')(url);

describe('Owners', () => {
    it('Truncate all owners data', async () => {
        const result = await request.post('/graphql')
            .send({
                "operationName": "Truncate",
                "query": "mutation Truncate($type: String!) { truncate(type: $type) { message }}",
                "variables": { "type": "owner" }
            })

        expect(result.status).to.equal(200);
        expect(result.body.data.truncate).to.have.property('message')
    })

    it('Create a owner', async () => {
        const result = await request.post('/graphql')
            .send({
                "operationName": "CreateOwner",
                "variables": { "input": { "name": "Pavan", "address": "Vizag", "mobile": "+91-9581594325", "email": "ppavalvelli@gmail.com", "pets": [1] } },
                "query": "mutation CreateOwner($input: CreateOwnerInput!) { createOwner(input: $input) { name email address mobile }}"
            })
        expect(result.status).to.equal(200);
        expect(result.body.data.createOwner).to.deep.equal({ "name": "Pavan", "address": "Vizag", "mobile": "+91-9581594325", "email": "ppavalvelli@gmail.com" });
    })

    it('Update a owner', async () => {
        const result = await request.post('/graphql')
            .send({
                "operationName": "UpdateOwner",
                "variables": { "id": 1, "input": { "name": "Siddhu", "address": "Vizag", "mobile": "+91-9581594325", "email": "vydyas@gmail.com", "pets": [1] } },
                "query": "mutation UpdateOwner($id: Int!,$input: CreateOwnerInput!) { updateOwner(id: $id, input: $input) { name email address mobile }}"
            })
        expect(result.status).to.equal(200);
        expect(result.body.data.updateOwner).to.deep.equal({ "name": "Siddhu", "address": "Vizag", "mobile": "+91-9581594325", "email": "vydyas@gmail.com" });
    })

    it('Returns owners with id = 1', async () => {
        const result = await request.post('/graphql')
            .send({ query: '{ getOwner(id: 1) { id name email  } }' })
        expect(result.status).to.equal(200);
        expect(result.body.data.getOwner).to.have.property('id')
        expect(result.body.data.getOwner).to.have.property('name')
        expect(result.body.data.getOwner).to.have.property('email')
        expect(result.body.data.getOwner).to.not.have.property('pets');
    })

    it('Returns all owners', async () => {
        const result = await request.post('/graphql')
            .send({ query: '{ owners { id name email } }' })
        expect(result.status).to.equal(200);
        expect(result.body.data.owners).to.have.lengthOf(1);
    })

    it('Truncate all owners data', async () => {
        const result = await request.post('/graphql')
            .send({
                "operationName": "Truncate",
                "query": "mutation Truncate($type: String!) { truncate(type: $type) { message }}",
                "variables": { "type": "owner" }
            })
        expect(result.status).to.equal(200);
        expect(result.body.data.truncate).to.have.property('message');
    })
});