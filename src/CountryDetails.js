import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  findCountryByCode,
  getUrl,
  getAllCountries,
  findShortestPath
} from "./CoutriesApi.js";

class CountryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPathTo: ""
    };
  }

  render() {
    const allCountries = getAllCountries();
    const country = this.props.country;
    const shortestPath = findShortestPath(
      country.alpha3Code,
      this.state.showPathTo
    );
    return (
      <div>
        <Link to="/">Back to all countries</Link>
        <h1>{country.name}</h1>
        <img src={country.flag} alt={`Flag of ${country.name}`} height="150" />
        <h3>Neighbors:</h3>
        <ul>{country.borders.map(this.LinkToNeighbor)}</ul>
        <h4>Show path to country:</h4>
        <select value={this.state.showPathTo} onChange={this.handleSelect}>
          {allCountries.map(c => (
            <option key={c.alpha3Code} value={c.alpha3Code}>
              {c.name}
            </option>
          ))}
        </select>
        {shortestPath ? (
          <this.CountryPath path={shortestPath} />
        ) : (
          <div>
            <strong>No path found</strong>
          </div>
        )}
      </div>
    );
  }

  handleSelect = e => {
    this.setState({ showPathTo: e.target.value });
  };

  CountryPath = props => {
    const { path } = props;
    const string = path
      .slice(1)
      .map(code => findCountryByCode(code).name)
      .reduce((acc, cur, i) => {
        const arrow = i === 0 ? "" : " -> ";
        return acc + arrow + cur;
      });
    return (
      <div>
        <strong>{string}</strong>
      </div>
    );
  };

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
