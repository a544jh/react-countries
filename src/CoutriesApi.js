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
