# Graphql Nodejs application with express and JSON Files

I made this application with lot of interest and to help opensource society to use this as 
boilerplate to kick start their projects.

## What about testcases?

I integrated with ```Mocha``` ```chai``` to test our code. 

## How to start this application?

If you have Nodejs installed machine then follow below steps?

```sh
 npm install

 npm run dev:api
 ```

## We ship our code through Docker.

Just enter below command to spin container

```sh
  docker-compose up
 ```

### Create a Owner
```sh
mutation CreateOwner($input: CreateOwnerInput!){
  createOwner(input:$input){
    id
    name
    email
    address
    mobile
  }
}
```

### Create a Owner along with pet if it is available
```sh
mutation CreateOwner($input: CreateOwnerInput!){
  createOwner(input:$input){
    id
    name
    email
    address
    mobile
    pet:[Int]
  }
}
```

### Getting Owners along with pets

```sh
query Owners {
  owners{
    id
    name
    email
    address,
    mobile,
    pets {
      name
    }
  }
}
```

### Getting Owners only

```sh
query Owners {
  owners{
    id
    name
    email
    address,
    mobile
  }
}
```

### Updating Owner

```sh
mutation UpdateOwner($id: Int!, $input: CreateOwnerInput!) {
  updateOwner(id: $id, input: $input) {
    id
    name
    email
    address
    mobile
  }
}
```
### Deleting Owner

```sh
mutation DeleteOwner($id: Int!){
  deleteOwner(id: $id){
    message
  }
}
```

### Update Pet
```sh
mutation UpdatePet($id:Int!, $input: CreatePetInput!) {
  updatePet(id: $id, input: $input){
    	id
    name
    breed
    colour
    age
  }
}
```
### Input for Owner and Pets

```sh
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
```
