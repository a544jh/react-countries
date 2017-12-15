import React, { Component } from "react";
import { Link } from "react-router-dom";
import { findCountryByCode, getUrl } from "./CoutriesApi.js";

class CountryDetails extends Component {
  render() {
    const country = this.props.country;
    return (
      <div>
        <Link to="/">Back to all countries</Link>
        <h1>{country.name}</h1>
        <img src={country.flag} alt={`Flag of ${country.name}`} height="150" />
        <h3>Neighbors:</h3>
        <ul>{country.borders.map(this.LinkToNeighbor)}</ul>
      </div>
    );
  }

  LinkToNeighbor = code => {
    const country = findCountryByCode(code);
    return (
      <li key={code}>
        <Link to={getUrl(country)}>{country.name}</Link>
      </li>
    );
  };
}

export default CountryDetails;
