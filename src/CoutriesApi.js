let storedCountries = [];

export const getCountries = () => {
  return new Promise((resolve, reject) => {
    fetch("https://restcountries.eu/rest/v2/all").then(resp => {
      resp.json().then(countries => {
        storedCountries = countries;
        resolve(countries);
      });
    });
  });
};

export const getCountryByCode = code => {
  storedCountries.find(c => code === c.alpha3code);
};
