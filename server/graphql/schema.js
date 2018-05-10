// Bring in build schema method from graphql package
const { buildSchema } = require("graphql");
const axios = require("axios");
// Bring in data (copied from swapi.co)
let users = require(`${__dirname}/model.js`);

// Function to get film data using axios from api url provided
function getFilms(url) {
  return axios.get(url).then(({ data }) => new Film(data));
}
// Function to get homeworld data using axios from api url proided
function getHomeworld(url) {
  return axios.get(url).then(({ data }) => new Homeworld(data));
}

class Person {
  constructor({ id, name, height, films, homeworld }) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.films = this.getFilms(films);
    this.homeworld = this.getHomeworld(homeworld);
  }

  getFilms(films) {
    return films[0] ? films.map(getFilms) : [];
  }
  getHomeworld(homeworld) {
    return homeworld ? getHomeworld(homeworld) : "";
    // return axios.get(homeworld).then(({ data }) => new Homeworld(data));
  }
}

class Homeworld {
  constructor({ name, population }) {
    this.name = name;
    this.population = population;
  }
}

class Film {
  constructor({ title, release_date }) {
    this.title = title;
    this.releaseDate = release_date;
  }
}

// Build the schema (description of what obj looks like)
const schema = buildSchema(
  `
  type Person {
    id: Int!
    name: String
    height: Int
    films: [Film]!
    homeworld: Homeworld
  },
  type Homeworld {
    name: String!
    population: String
  },
  type Film {
    title: String!
    releaseDate: String
  },
  type Query {
    people: [Person]!
  }
  `
);

const root = {
  // Has to match existing property in type Query in the schema
  people() {
    const formatted = users.map(val => new Person(val));
    return formatted;
  }
};

module.exports = {
  root,
  schema
};
