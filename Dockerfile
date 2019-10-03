FROM node:latest
RUN mkdir -p /usr/src/graphql-express
WORKDIR /usr/src/graphql-express
COPY package.json /usr/src/graphql-express/
RUN npm install
COPY . /usr/src/graphql-express
EXPOSE 3500
CMD npm run dev:api