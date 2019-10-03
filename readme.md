query Owners {
  owners{
    id
    name
    email
    address,
    mobile
  }
}

mutation CreateOwner($input: CreateOwnerInput!){
  createOwner(input:$input){
    id
    name
    email
    address
    mobile
  }
}

mutation UpdateOwner($id: Int!, $input: CreateOwnerInput!) {
  updateOwner(id: $id, input: $input) {
    id
    name
    email
    address
    mobile
  }
}

mutation DeleteOwner($id: Int!){
  deleteOwner(id: $id){
    message
  }
}

mutation UpdatePet($id:Int!, $input: CreatePetInput!) {
  updatePet(id: $id, input: $input){
    	id
    name
    breed
    colour
    age
  }
}

{
  "input":  {
    "name":"Siddhu",
    "email":"vydyas@gmail.com",
    "address": "Hyderabad",
    "mobile": "+91-9581594325"
	}
}

{
  "id": 1,
  "input":  {
    "name":"Siddhu",
    "email":"vydyas@gmail.com",
    "address": "Hyderabad",
    "mobile": "+91-9581594325",
    "pets":[1,2]
	}
}

{
  "input":  {
    "name":"Kicchu",
    "breed": "Persian",
    "age": 10,
    "colour": "red"
	}
}

{
  "id": 1,
  "input":  {
    "name":"chakki",
    "breed": "Persian",
    "age": 10,
    "colour": "red"
	}
}