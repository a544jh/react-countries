import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCountryByCode } from "./CoutriesApi.js";

class CountryDetails extends Component {
  render() {
    const country = this.props.country;
    return (
      <div>
        <h1>{country.name}</h1>
        <img src={country.flag} alt={`Flag of ${country.name}`} width="200" />
        <h3>Neighbors:</h3>
        <ul>{country.borders.map(this.LinkToNeighbor)}</ul>
      </div>
    );
  }

  LinkToNeighbor = code => {
    const country = getCountryByCode(code);
    return (
      <li key={code}>
        <Link to={`/${code.toLowerCase()}`}>{country.name}</Link>
      </li>
    );
  };
}

export default CountryDetails;
