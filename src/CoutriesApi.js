// lightweight "global state"...
window.ReactCountries = {
  countries: []
};

const store = window.ReactCountries;

export const getCountries = () => {
  return new Promise((resolve, reject) => {
    fetch("https://restcountries.eu/rest/v2/all").then(resp => {
      resp.json().then(countries => {
        store.countries = countries;
        resolve(countries);
      });
    });
  });
};

export const findCountryByCode = code => {
  return store.countries.find(c => {
    return code === c.alpha3Code;
  });
};
