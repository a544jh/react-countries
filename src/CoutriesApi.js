import Graph from "./lib/node-dijkstra/Graph";

// lightweight "global state"
window.ReactCountries = {
  countries: []
};

const store = window.ReactCountries;

export const getCountries = () => {
  return new Promise((resolve, reject) => {
    fetch("https://restcountries.eu/rest/v2/all").then(resp => {
      resp.json().then(countries => {
        store.countries = countries;
        store.countryGraph = constructCoutriesGraph(countries);
        resolve(countries);
      });
    });
  });
};

export const findCountryByCode = code =>
  store.countries.find(c => code === c.alpha3Code);

export const getUrl = country => `/${country.alpha3Code.toLowerCase()}`;

export const findCountryByUrl = url =>
  store.countries.find(c => url === getUrl(c));

export const getAllCountries = () => store.countries;

export const findShortestPath = (codeA, codeB) =>
  store.countryGraph.path(codeA, codeB);

const constructCoutriesGraph = countries => {
  const graph = new Graph();
  countries.forEach(c => {
    graph.addNode(c.alpha3Code, neighbors(c));
  });
  return graph;
};

const neighbors = country => {
  const neighbors = {};
  country.borders.forEach(c => (neighbors[c] = 1));
  return neighbors;
};
